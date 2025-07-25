---
sidebar_position: 6
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# StatusEffect

[Humanoid Data]: ../tutorial/statuses/humanoid-data.md
[Character]: ../api/character.md
[Timer]: https://www.npmjs.com/package/@rbxts/timer
[Metadata]: ../tutorial/extras/metadata.md
[Janitor]: https://howmanysmall.github.io/Janitor/

<TOCInline toc={toc} />

## Fields

### `Character` **@readonly**
A [Character] object this status effect is tied with.

### `Janitor` **@readonly**
A [Janitor] object. Cleans up everything after skill ends.

### `Player` **@readonly**
A [Player](https://create.roblox.com/docs/reference/engine/classes/Player) object the skill is associated with.
Retrieved internally by `Players:GetPlayerFromCharacter(self.Character.Instance)`.

### `Name` **@readonly**
A string value.

### `ConstructorArguments` **@readonly**
A table of arguments provided after the [Character] in `.new()`.

### `DestroyOnEnd`
A boolean value. Determines if `self:Destroy()` when `End` is fired.

### `DamageModificationPriority`
A number value. Determines the position in which `HandleDamage()` is applied.
The higher the value, the later it applies.

## Events

### `Started`
Fires whenever status effect starts. Works on client and server.

### `Ended`
Fires whenever status effect ends. Works on client and server.

### `StateChanged`
Fires whenever current status effect state changes.

**`Parameters:`**
* NewState: `StatusEffectState`
* OldState: `StatusEffectState`

### `HumanoidDataChanged`
Fires whenever current [Humanoid Data](../tutorial/statuses/humanoid-data.md) changes.

**`Parameters:`**
* NewData: `HumanoidData?`
* OldData: `HumanoidData?`

### `Destroyed`
Fires whenever status effect gets destroyed (removed from the character).

### `MetadataChanged`
Fires whenever status effect [metadata](../tutorial/extras/metadata.md) changes.

**`Parameters:`**
* NewMeta: `Metadata?` - a generic type.
* OldMeta: `Metadata?` - a generic type.

## Constructors

### new(character) -> Skill
Accepts the [Character] and returns a new status effect.

**`Parameters:`**
* [Character]

## Methods

### `Start(time?)`
Starts the status effect.

**`Parameters:`**
* Time: `number?`

### `End()` 
Ends the status effect. 

### `Stop()` @alias
Ends the status effect. Alias for `End()`.

### `Pause()`
Pauses the internal status effect [Timer].
Warns if `time` wasn't provided in `Start()`.

### `Resume()`
Resumes the internal [Timer].

### `GetStartTimestamp()`
Returns a start timestamp of the internal [Timer], if active.

**`Returns:`**
* number?

### `GetEndTimestamp()`
Returns the approximated end timestamp of the internal [Timer], if active.

**`Returns:`**
* number?

### `SetHumanoidData(data, priority?)`
Sets the currently applied [Humanoid Data].

**`Parameters:`**
* Data: `HumanoidData`
* Priority: `number` - defaults to 1.

### `ClearHumanoidData()`
Clears the currently set [Humanoid Data].

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

### `GetHumanoidData()`
Retrieves the currently set [Humanoid Data].

**`Returns:`**
* Data: `HumanoidData`

### `GetState()`
Retrieves the current status effect state.
State object looks like this:
```
{ IsActive: boolean }
```

**`Returns:`**
* State: `StatusEffectState`

### `Destroy()`
Destroys the skill and removes it from the character.

### `HandleDamage(modified, original, source)` @override
Accepts 2 arguments: the previously modified and original damage.
Should return modified damage.

**`Parameters:`**
* Modified: `number` - a damage previously modified by other status effects.
* Original: `number` - original damage value from the container.
* Source: `AnySkill | AnyStatus | nil` - damage source.

**`Returns:`**
* number

### `GetModificationPriority()`
Returns the value of `DamageModificationPriority`.

**`Returns:`**
* number

### `IsDestroyed()`
Returns if the status effect is destroyed / removed from the [Character].

**`Returns:`**
* boolean

### `OnConstructServer(...args)` @override
Called after class gets instantiated on server.

**`Parameters:`**
* ...args: `...ConstructorArguments` A tuple of arguments that was provided to `.new` after `Character`.

### `OnConstructClient(...args)` @override
Called after class gets instantiated on client.

**`Parameters:`**
* ...args: `...ConstructorArguments` A tuple of arguments that was provided to `.new` after `Character`.

### `OnStartServer()` @override
Fires whenever status effect starts on the server.

**`Parameters:`**
* StarterParams: `StarterParams` - a generic type.

### `OnStartClient()` @override
Fires whenever status effect starts on the client.

**`Parameters:`**
* StarterParams: `StarterParams` - a generic type.

### `OnEndServer()` @override
Fires whenever status effect ends on server.

### `OnEndClient()` @override
Fires whenever status effect ends on client.