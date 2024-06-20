---
sidebar_position: 5
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# Skill

[Timer]: https://www.npmjs.com/package/@rbxts/timer
[Character]: ./character.md
[Status Effect]: ./statusEffect.md
[Metadata]: ../tutorial/extras/metadata.md
[Message]: ../tutorial/skills/messages.md
[Janitor]: https://howmanysmall.github.io/Janitor/

<TOCInline toc={toc} />

## Fields

### `Janitor` **@readonly**
A [Janitor] object. Cleans up everything after skill ends.

### `CooldownTimer` **@readonly**
A [Timer] object. Starts, when `ApplyCooldown()` gets invoked on server. Does not sync to client.

### `Character` **@readonly**
A [Character] object this skill is tied with.

### `Player` **@readonly**
A [Player](https://create.roblox.com/docs/reference/engine/classes/Player) object the skill is associated with.
Retrieved internally by `Players:GetPlayerFromCharacter(self.Character.Instance)`.

### `Name` **@readonly**
A string value.

### `ConstructorArguments` **@readonly**
A table of arguments provided after the [Character] in `.new()`.

### `CheckOthersActive`
A boolean value. Checks whenever other skills should be non active for :Start() to proceed.

### `CheckedByOthers`
A boolean value. Determines if other skills should check if the skill is active to proceed.

### `ParamValidators`
An array of `Validator` functions that validate your starter params.

### `MutualExclusives`
`Constructor<AnyStatus>[]`. An array of [Status Effect] constructors. If any of them is applied to [Character] object whenever `Start()` is called,
it will not proceed further and skill will not be started.

### `Requirements`
`Constructor<AnyStatus>[]`. An array of [Status Effect] constructors. Checks [Character] for the following
effects to be applied before starting the skill.

### `CheckClientState`
A boolean value. Checks whenever the start function should check if the skill is active/on cooldown on client side before firing a remote.

## Events

### `Started`
Fires whenever skill starts. Works on client and server.

### `Ended`
Fires whenever skill ends. Works on client and server.

### `StateChanged`
Fires whenever current [skill state](../tutorial/skills/state.md) changes.

**`Parameters:`**
* NewState: `SkillState`
* OldState: `SkillState`

### `Destroyed`
Fires whenever skill gets destroyed (removed from the character).

### `MetadataChanged`
Fires whenever skill [metadata](../tutorial/extras/metadata.md) changes.

**`Parameters:`**
* NewMeta: `Metadata?` - a generic type.
* OldMeta: `Metadata?` - a generic type.

## Constructors

### new(character) -> Skill
Accepts the [Character] and returns a new skill.

**`Parameters:`**
* [Character]

## Methods

### `Start(params)`
Server: Starts the skill.
Client: Sends a request to server that will call :Start() on server.

**`Parameters:`**
* Parameters: `StarterParams` - a generic type.

### `IsDestroyed()`
Returns true if the skill is destroyed / removed from the [Character].

**`Returns:`**
* boolean

### `End()`
Force end the skill. This is automatically called after OnStartServer() is completed.

### `Stop()` @alias
Ends the skill. Alias for `End()`.

### `GetSkillType()`
Retrieves the skill type.

**`Returns:`**
* Type: `SkillType`

### `Destroy()`
Destroys the skill and removes it from the character.

### `GetState()`
Retrieves the current skill state.

**`Returns:`**
* State: `SkillState` - [reference](../tutorial/skills/state.md)

### `GetName()`
Retrieves the skill name.

**`Returns:`**
* string

### `ClearMetadata()`
Clears the current [Metadata]. Only works on server.

### `SetMetadata(meta)`
Sets the current [Metadata].

**`Parameters:`**
* Metadata: `Metadata` - a generic type.

### `GetMetadata()`
Retrieves the current [Metadata].

**`Returns:`**
* Metadata: `Metadata` - a generic type.

### `CreateDamageContainer(dmg)`
Creates a damage container, with the current skill specified in `Source`.

**`Parameters:`**
* Damage: `number`

**`Returns:`**
* Container: `DamageContainer`

### `ApplyCooldown(cd)`
Applies a cooldown to the skill. Works only on server.

**`Parameters:`**
* Cooldown: `number`

**`Returns:`**
* boolean

### `SendMessageToClient(message)`
Sends a [Message] from server to client.

**`Parameters:`**
* Message: `ServerToClientMessage` - a generic type.

### `SendMessageToServer(message)`
Sends a [Message] from client to server.

**`Parameters:`**
* Message: `ClientToServerMessage` - a generic type.

### `OnConstruct(...args)` @override
Called after class gets instantiated (both client and server).

**`Parameters:`**
* ...args: `...ConstructorArguments` A tuple of arguments that was provided to `.new` after `Character`.

### `OnConstructServer(...args)` @override
Called after class gets instantiated on server.

**`Parameters:`**
* ...args: `...ConstructorArguments` A tuple of arguments that was provided to `.new` after `Character`.

### `OnConstructClient(...args)` @override
Called after class gets instantiated on client.

**`Parameters:`**
* ...args: `...ConstructorArguments` A tuple of arguments that was provided to `.new` after `Character`.

### `ShouldStart()` @override
Determines if the skill should start, when `Start()` is called.

**`Returns:`**
* boolean

### `OnStartServer(params)` @override
Called whenever skill starts on the server.
Accepts an argument passed to `Start()`.

**`Parameters:`**
* StarterParams: `StarterParams` - a generic type.

### `OnStartClient(params)` @override
Called whenever skill starts on the client.
Accepts an argument passed to `Start()`.

**`Parameters:`**
* StarterParams: `StarterParams` - a generic type.

### `OnEndServer()` @override
Called whenever skill ends on server.

### `OnEndClient()` @override
Called whenever skill ends on client.

### `HandleClientMessage(message)` @override
Called whenever server when a message from client was received.

**`Parameters:`**
* Message: `ClientToServerMessage` - a generic type.

:::danger
**Always** validate client messages with *sensitive data*.
:::

### `HandleServerMessage(message)` @override
Called whenever client when a message from server was received.

**`Parameters:`**
* Message: `ServerToClientMessage` - a generic type.