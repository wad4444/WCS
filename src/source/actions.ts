import { type Atom, notify } from "@rbxts/charm";
import { type None, produce } from "@rbxts/immut";
import type { Draft } from "@rbxts/immut/src/types-external";
import type { WCS_Server } from "exports";
import type { CharacterData } from "source/character";
import type { SkillData } from "source/skill";
import type { StatusData } from "source/statusEffect";
import { getActiveHandler, logError } from "source/utility";

type InferAtomState<T> = T extends Atom<infer S> ? S : never;

function MutateAtom<C extends Atom<any>>(
	atom: C,
	recipe: (draft: Draft<InferAtomState<C>>) =>
		| typeof draft
		| undefined
		// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
		| void
		| (InferAtomState<C> extends undefined ? typeof None : never),
) {
	atom(produce(atom(), recipe));
	notify(atom);
}

function getAtom() {
	const handler = getActiveHandler<WCS_Server>();
	if (!handler)
		logError(
			"Attempted to dispatch an action before server handler initialization.",
		);

	return handler.__WCS_Atom;
}

export function setCharacterData(
	CharacterIndex: string,
	CharacterData: CharacterData,
) {
	MutateAtom(getAtom(), (Draft) => {
		Draft.set(CharacterIndex, CharacterData);
	});
}

export function patchCharacterData(
	CharacterIndex: string,
	Patch: Partial<CharacterData>,
) {
	const atom = getAtom();
	const state = atom();
	const currentData = state.get(CharacterIndex);
	if (!currentData) return;

	const patchedData = {
		...currentData,
		...Patch,
	};

	MutateAtom(atom, (Draft) => {
		Draft.set(CharacterIndex, patchedData);
	});
}

export function deleteCharacterData(CharacterIndex: string) {
	MutateAtom(getAtom(), (Draft) => {
		Draft.delete(CharacterIndex);
	});
}

export function setStatusData(
	CharacterIndex: string,
	Id: string,
	Data: StatusData,
) {
	MutateAtom(getAtom(), (Draft) => {
		const statusEffects = Draft.get(CharacterIndex)?.statusEffects;
		statusEffects?.set(Id, Data);
	});
}

export function deleteStatusData(CharacterIndex: string, Id: string) {
	MutateAtom(getAtom(), (Draft) => {
		const statusEffects = Draft.get(CharacterIndex)?.statusEffects;
		statusEffects?.delete(Id);
	});
}

export function patchStatusData(
	CharacterIndex: string,
	Id: string,
	Patch: Partial<StatusData>,
) {
	const atom = getAtom();
	const state = atom();
	const characterData = state.get(CharacterIndex);
	if (!characterData) return state;

	const previous = characterData.statusEffects.get(Id);
	if (!previous) return state;

	const patchedData = {
		...previous,
		...Patch,
	};

	MutateAtom(atom, (Draft) => {
		const statusEffects = Draft.get(CharacterIndex)?.statusEffects;
		statusEffects?.set(Id, patchedData);
	});
}

export function setSkillData(
	CharacterIndex: string,
	Name: string,
	Data: SkillData,
) {
	MutateAtom(getAtom(), (Draft) => {
		const skills = Draft.get(CharacterIndex)?.skills;
		skills?.set(Name, Data);
	});
}

export function deleteSkillData(CharacterIndex: string, Name: string) {
	MutateAtom(getAtom(), (Draft) => {
		const skills = Draft.get(CharacterIndex)?.skills;
		skills?.delete(Name);
	});
}

export function patchSkillData(
	CharacterIndex: string,
	Name: string,
	Patch: Partial<SkillData>,
) {
	const atom = getAtom();
	const state = atom();
	const characterData = state.get(CharacterIndex);
	if (!characterData) return;

	const previous = characterData.skills.get(Name);
	if (!previous) return;

	const patchedData = {
		...previous,
		...Patch,
	};

	MutateAtom(atom, (Draft) => {
		const skills = Draft.get(CharacterIndex)?.skills;
		skills?.set(Name, patchedData);
	});
}
