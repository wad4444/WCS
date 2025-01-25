import { subscribe } from "@rbxts/charm";
import { Janitor } from "@rbxts/janitor";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/sleitnick-signal";
import { t } from "@rbxts/t";
import { Timer, TimerState } from "@rbxts/timer";
import {
	deleteStatusData,
	patchStatusData,
	setStatusData,
} from "source/actions";

import type {
	AffectableHumanoidProps,
	Character,
	DamageContainer,
} from "./character";
import { type FlagWithData, Flags } from "./flags";
import {
	type DeepReadonly,
	clientAtom,
	createIdGenerator,
	freezeCheck,
	getActiveHandler,
	isClientContext,
	isServerContext,
	logError,
	logWarning,
} from "./utility";

export interface StatusData {
	className: string;
	state: StatusEffectState;
	metadata?: unknown;
	humanoidData?: HumanoidData;
	constructorArgs: unknown[];
}

interface StatusEffectProps {
	Character: Character;
	Flag: FlagWithData<string>;
}

export interface StatusEffectState {
	IsActive: boolean;
}

export interface HumanoidData {
	Props: Partial<{
		[P in keyof AffectableHumanoidProps]: [
			AffectableHumanoidProps[P],
			"Set" | "Increment",
		];
	}>;
	Priority: number;
}

type StatusEffectConstructor = new (
	...args: [Character, ...constructorArgs: any[]]
) => UnknownStatus;

type ReadonlyState = DeepReadonly<StatusEffectState>;
export type AnyStatus = StatusEffect<any, any[]>;
export type UnknownStatus = StatusEffect<unknown, unknown[]>;

const registeredStatuses: Map<string, StatusEffectConstructor> = new Map();
const nextId = createIdGenerator(0, isServerContext() ? 1 : -1);

/**
 * A status effect class.
 */
export class StatusEffect<
	Metadata = void,
	ConstructorArguments extends unknown[] = [],
> {
	private readonly janitor = new Janitor();
	protected readonly Janitor = new Janitor<any>();

	public readonly MetadataChanged = new Signal<
		[NewMeta: Metadata | undefined, PreviousMeta: Metadata | undefined]
	>();
	public readonly StateChanged = new Signal<
		[State: ReadonlyState, PreviousState: ReadonlyState]
	>();
	public readonly HumanoidDataChanged = new Signal<
		[Data: HumanoidData | undefined, PreviousData: HumanoidData | undefined]
	>();
	public readonly Destroyed = new Signal();
	public readonly Started = new Signal();
	public readonly Ended = new Signal();

	public readonly Player?: Player;
	public readonly Name = tostring(getmetatable(this));

	/**
	 * A number value. Determines the position in which `HandleDamage()` is applied.
	 * The higher the value, the later it applies.
	 */
	protected DamageModificationPriority = 1;

	public readonly Character: Character;
	public DestroyOnEnd = true;

	private state: StatusEffectState = {
		IsActive: false,
	};
	private metadata?: Metadata;
	private humanoidData?: HumanoidData;
	private executionThread?: thread;

	private isDestroyed = false;
	private readonly timer = new Timer(1);
	private readonly id;
	/** @internal */
	public readonly isReplicated: boolean;

	protected readonly ConstructorArguments: ConstructorArguments;

	constructor(Character: Character, ...Args: ConstructorArguments);
	/**
	 * @internal Reserved for internal usage
	 * @hidden
	 */
	constructor(Character: StatusEffectProps);
	constructor(
		Props: Character | StatusEffectProps,
		...Args: ConstructorArguments
	) {
		const { Character, Flag } =
			tostring(getmetatable(Props)) !== "Character"
				? (Props as StatusEffectProps)
				: { Character: Props as Character, Flag: undefined };

		this.id =
			Flag && Flag.flag === Flags.CanAssignCustomId
				? Flag.data
				: tostring(nextId());
		this.Character = Character;

		if (
			!this.Character ||
			tostring(getmetatable(this.Character)) !== "Character"
		) {
			logError("Not provided a valid character for StatusEffect constructor");
		}

		if (!getActiveHandler()) {
			logError(
				"Attempted to instantiate a character before server has started.",
			);
		}

		if (!registeredStatuses.has(tostring(getmetatable(this)))) {
			logError(
				`${tostring(getmetatable(this))} is not a valid status effect. Did you forget to apply a decorator?`,
			);
		}

		this.Player = Players.GetPlayerFromCharacter(this.Character.Instance);

		this.isReplicated = isClientContext() && tonumber(this.id)! > 0;
		this.ConstructorArguments = Args;

		this.StateChanged.Connect((New, Old) =>
			this.stateDependentCallbacks(
				New as StatusEffectState,
				Old as StatusEffectState,
			),
		);

		this.Ended.Connect(() => this.Janitor.Cleanup());
		this.Ended.Connect(() => {
			if (this.DestroyOnEnd && (isServerContext() || !this.isReplicated))
				this.Destroy();
		});

		this.timer.completed.Connect(() => this.End());

		this.janitor.Add(() => {
			this.Janitor.Cleanup();
			this.StateChanged.Destroy();
			this.MetadataChanged.Destroy();
			this.HumanoidDataChanged.Destroy();
			this.Destroyed.Destroy();
			this.Started.Destroy();
			this.Ended.Destroy();
			this.timer.destroy();
		});

		Character.addStatus(this);
		this.startReplicationClient();

		if (isServerContext()) {
			setStatusData(this.Character.GetId(), this.id, this.packData());
		}
		this.OnConstruct(...Args);
		isServerContext()
			? this.OnConstructServer(...Args)
			: this.OnConstructClient(...Args);
	}

	/**
	 * Starts the status effect.
	 */
	public Start(Time?: number) {
		if (this.isReplicated)
			return logWarning("Cannot perform this action on a replicated status");

		if (this.timer.getState() === TimerState.Running) {
			return;
		}

		if (this.timer.getState() === TimerState.Paused) {
			this.timer.resume();
			this.timer.stop();
		}

		this.setState({
			IsActive: true,
		});

		if (Time === undefined || Time <= 0) return;
		this.timer.setLength(Time);
		this.timer.start();
	}

	/**
	 * Ends the status effect.
	 */
	public Stop() {
		this.End();
	}

	/**
	 * Pauses the status effect.
	 */
	public Pause() {
		if (this.isReplicated)
			return logWarning("Cannot perform this action on a replicated status");

		if (this.timer.getState() !== TimerState.Running) {
			logWarning("Cannot pause a non active status effect");
			return;
		}

		this.timer.pause();
	}

	/**
	 * Resumes the status effect.
	 */
	public Resume() {
		if (this.isReplicated)
			return logWarning("Cannot perform this action on a replicated status");

		if (this.timer.getState() !== TimerState.Paused) {
			logWarning("Cannot resume a non paused status effect");
			return;
		}

		this.timer.resume();
	}

	/**
	 * Ends the status effect.
	 */
	public End() {
		if (this.isReplicated)
			return logWarning("Cannot perform this action on a replicated status");

		if (!this.GetState().IsActive) {
			return;
		}

		this.setState({
			IsActive: false,
		});

		if (this.timer.getState() === TimerState.NotRunning) {
			return;
		}

		if (this.timer.getState() === TimerState.Paused) {
			this.timer.resume();
			this.timer.stop();
			return;
		}

		this.timer.stop();
	}

	/**
	 * Sets the humanoid data that is going to be applied to the character while the status effect is active.
	 */
	public SetHumanoidData(Props: HumanoidData["Props"], Priority = 1) {
		const newData = {
			Props: Props,
			Priority: Priority,
		};

		const old = this.humanoidData;
		this.humanoidData = newData;

		this.HumanoidDataChanged.Fire(newData, old);

		if (isServerContext()) {
			patchStatusData(this.Character.GetId(), this.id, {
				humanoidData: this.humanoidData,
			});
		}
	}

	/**
	 * Clears the humanoid data.
	 */
	public ClearHumanoidData() {
		this.humanoidData = undefined;
		this.HumanoidDataChanged.Fire(undefined, this.humanoidData);

		if (isServerContext()) {
			patchStatusData(this.Character.GetId(), this.id, {
				humanoidData: undefined,
			});
		}
	}

	/**
	 * Clears the metadata
	 */
	protected ClearMetadata() {
		if (this.isReplicated) {
			logError(
				"Cannot :ClearMetadata() of replicated status effect on client! \n This can lead to a possible desync",
			);
		}

		this.MetadataChanged.Fire(undefined, this.metadata);
		this.metadata = undefined;

		if (isServerContext()) {
			patchStatusData(this.Character.GetId(), this.id, {
				metadata: undefined,
			});
		}
	}

	/**
	 * Sets the state of the status effect.
	 */
	protected setState(Patch: Partial<StatusEffectState>) {
		const newState = {
			...this.state,
			...Patch,
		};

		const oldState = this.state;

		freezeCheck(newState);
		this.state = newState;

		if (isServerContext()) {
			patchStatusData(this.Character.GetId(), this.id, {
				state: newState,
			});
		}

		this.StateChanged.Fire(newState, oldState);
	}

	/**
	 * Sets the metadata of the status effect.
	 */
	protected SetMetadata(NewMeta: Metadata) {
		if (this.isReplicated) {
			logError(
				"Cannot :SetMetadata() of replicated status effect on client! \n This can lead to a possible desync",
			);
		}
		if (t.table(NewMeta)) freezeCheck(NewMeta);

		this.MetadataChanged.Fire(NewMeta, this.metadata);
		this.metadata = NewMeta;

		if (isServerContext()) {
			patchStatusData(this.Character.GetId(), this.id, {
				metadata: NewMeta,
			});
		}
	}

	/**
	 * Gets the state of the status effect
	 * */
	public GetState() {
		return this.state as ReadonlyState;
	}

	/**
	 * Gets the humanoid data of the status effect
	 */
	public GetHumanoidData() {
		return this.humanoidData;
	}

	/**
	 * Gets the metadata of the status effect
	 */
	public GetMetadata() {
		return this.metadata;
	}

	/**
	 * Returns true if the status effect is destroyed
	 */
	public IsDestroyed() {
		return this.isDestroyed;
	}

	/**
	 * Gets the id of the status effect
	 * @internal @hidden
	 */
	public GetId() {
		return this.id;
	}

	/**
	 * A method that is used to modify damage applied to a character
	 */
	public HandleDamage(Modified: number, Original: number) {
		return Modified;
	}

	/**
	 * Returns the value of DamageMoficicationPriority.
	 */
	public GetModificationPriority() {
		return this.DamageModificationPriority;
	}

	/**
	 * Destroys the status effect and removes it from the character
	 */
	public Destroy() {
		if (this.isDestroyed) return;

		if (isServerContext()) {
			this.End();
			deleteStatusData(this.Character.GetId(), this.id);
		} else {
			this.setState({
				IsActive: false,
			});
		}

		this.isDestroyed = true;
		this.Destroyed.Fire();
		this.janitor.Cleanup();
	}

	/**
	 * A shortcut for creating a damage container
	 */
	protected CreateDamageContainer(Damage: number): DamageContainer {
		return {
			Damage: Damage,
			Source: this,
		};
	}

	/**
	 * @internal Reserved for internal usage
	 * @hidden
	 */
	public packData(): StatusData {
		return {
			className: tostring(getmetatable(this)),
			state: this.state,
			constructorArgs: this.ConstructorArguments,
		};
	}

	private stateDependentCallbacks(
		State: StatusEffectState,
		PreviousState: StatusEffectState,
	) {
		if (PreviousState.IsActive === State.IsActive) return;
		if (!PreviousState.IsActive && State.IsActive) {
			this.Started.Fire();
			this.executionThread = task.spawn(() => {
				isClientContext() ? this.OnStartClient() : this.OnStartServer();
				this.executionThread = undefined;
			});
		} else if (PreviousState.IsActive && !State.IsActive) {
			if (
				this.executionThread &&
				coroutine.status(this.executionThread) !== "normal"
			) {
				task.cancel(this.executionThread);
				this.executionThread = undefined;
			}
			isClientContext() ? this.OnEndClient() : this.OnEndServer();
			this.Ended.Fire();
		}
	}

	/** @hidden @internal */
	public processDataUpdate(
		StatusData?: StatusData,
		PreviousData: StatusData = this.packData(),
	) {
		if (!StatusData) return;

		if (StatusData.state !== PreviousData.state) {
			freezeCheck(StatusData.state);
			this.state = StatusData.state;
			this.StateChanged.Fire(StatusData.state, PreviousData.state);
		}

		if (StatusData.metadata !== PreviousData.metadata) {
			if (t.table(StatusData.metadata)) freezeCheck(StatusData.metadata);
			this.metadata = StatusData.metadata as Metadata | undefined;
			this.MetadataChanged.Fire(
				StatusData.metadata as Metadata | undefined,
				PreviousData.metadata as Metadata | undefined,
			);
		}

		if (StatusData.humanoidData !== PreviousData.humanoidData) {
			if (StatusData.humanoidData) freezeCheck(StatusData.humanoidData);
			this.humanoidData = StatusData.humanoidData;
			this.HumanoidDataChanged.Fire(
				StatusData.humanoidData,
				PreviousData.humanoidData,
			);
		}
	}

	private startReplicationClient() {
		if (!this.isReplicated) return;

		const subscription = subscribe(
			() => clientAtom()?.statusEffects.get(this.id),
			(current, old) => this.processDataUpdate(current, old),
		);

		const state = clientAtom()?.statusEffects.get(this.id);
		this.processDataUpdate(state);

		this.janitor.Add(subscription);
	}

	/** Called after class gets instantiated (both client and server) */
	protected OnConstruct(...Args: ConstructorArguments) {}
	/** Called after class gets instantiated on client */
	protected OnConstructClient(...Args: ConstructorArguments) {}
	/** Called after class gets instantiated on server */
	protected OnConstructServer(...Args: ConstructorArguments) {}

	protected OnStartServer() {}
	protected OnStartClient() {}
	protected OnEndClient() {}
	protected OnEndServer() {}
}

export function StatusEffectDecorator<T extends StatusEffectConstructor>(
	Constructor: T,
) {
	const name = tostring(Constructor);
	if (registeredStatuses.has(name)) {
		logError(`StatusEffect with name ${name} was already registered before`);
	}

	registeredStatuses.set(name, Constructor);
}

export function GetRegisteredStatusEffectConstructor(Name: string) {
	return registeredStatuses.get(Name);
}
