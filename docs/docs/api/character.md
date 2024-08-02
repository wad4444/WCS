---
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# Character

[Moveset]: ../tutorial/extras/movesets.md

<TOCInline toc={toc} />

## Static Events / Methods
### `CharacterCreated`
**An event.** Fires whenever a character gets created.

**`Parameters:`**
* Character: `Character` - a character that gets created.

### `CharacterDestroyed`
**An event.** Fires whenever a character gets destroyed.

**`Parameters:`**
* Character: `Character` - a character that gets destroyed.

### `GetCharacterMap()`
Starts the handler.

**`Returns:`**
* CharacterMap: `Map`. A map where key is `Instance` and the value is `Character` attached to it.

### `GetCharacterFromInstance(instance)`
Retrieves the character associated with the given instance.

**`Parameters:`**
* Instance: `Instance`

**`Returns:`**
* Character: `Character?`. A character associated with the provided instance.

### `GetLocalCharacter()`
Retrieves the character associated with the local player.

**`Returns:`**
* Character: `Character?`.

## Fields

### `Instance` **@readonly**
An instance *Character* object is attached to.

### `DisableSkills`
A boolean value. Character's skills cannot be started if true.

### `Humanoid` **@readonly**
A [Humanoid](https://create.roblox.com/docs/reference/engine/classes/Humanoid) associated with character's *instance*.

### `Player?` **@readonly**
A [Player](https://create.roblox.com/docs/reference/engine/classes/Player) associated with the character.
Retrieved internally by `Players:GetPlayerFromCharacter(self.Instance)`.

## Events
### `SkillAdded`
**An event**. Gets fired when [a skill](./skill.md) gets added to the character.

**`Parameters:`**
* Skill: `Skill` - [A skill](./skill.md) that got added.

### `SkillRemoved`
**An event**. Gets fired when [a skill](./skill.md) gets removed from the character.

**`Parameters:`**
* Skill: `Skill` - [A skill](./skill.md) that got removed.

### `SkillStarted`
**An event**. Gets fired when [a skill](./skill.md) that is assigned to the character starts.

**`Parameters:`**
* Skill: `Skill` - [A skill](./skill.md) that got started.

### `SkillEnded`
**An event**. Gets fired when [a skill](./skill.md) that is assigned to the character ends.

**`Parameters:`**
* Skill: `Skill` - [A skill](./skill.md) that got ended.

### `StatusEffectAdded`
**An event**. Gets fired when [a status effect](./statusEffect.md) gets added to the character.

**`Parameters:`**
* Status: `StatusEffect` - [A status effect](./skill.md) that got removed.

### `StatusEffectRemoved`
Gets fired when [a status effect](./statusEffect.md) gets removed from the character.

**`Parameters:`**
* Status: `StatusEffect` - [A status effect](./skill.md) that got removed.

### `StatusEffectStarted`
**An event**. Gets fired when [a status effect](./statusEffect.md) that is assigned to the character starts.

**`Parameters:`**
* Status: `StatusEffect` - [A status effect](./skill.md) that got started.

### `StatusEffectEnded`
Gets fired when [a status effect](./statusEffect.md) that is assigned to the character ends.

**`Parameters:`**
* Status: `StatusEffect` - [A status effect](./skill.md) that got ended.

### `HumanoidPropertiesUpdated`
Gets fired when character's [humanoid data](../tutorial/statuses/humanoid-data.md) gets updated.

**`Parameters:`**
* Props: `AffectableHumanoidProps` - a map of `propertyName` and it's new `value`.

### `DamageTaken`
Gets fired when character takes damage from any [skill](./skill.md) / [status effect](./statusEffect.md).
Container's source will always be `nil` on client

**`Parameters:`**
* Container: `DamageContainer`. 

### `DamageDealt`
Gets fired when any [skill](./skill.md) or [status effect](./statusEffect.md) that belongs to this character damage another character.

**`Parameters:`**
* Container: `DamageContainer`. 

### `Destroyed`
Gets fired when character gets destroyed.

### `MovesetChanged`
Gets fired when character's current [Moveset] changed.

**`Parameters:`**
* NewMoveset: `string?` - a name of the new moveset.
* OldMoveset: `string?` - a name of the old moveset.

:::note
Moveset object can get retrieved using `:GetMovesetObjectByName()`
:::

## Constructors

### new(instance) -> Character
Accepts the instance and returns a new WCS Character.
Instance must contain a [Humanoid](https://create.roblox.com/docs/reference/engine/classes/Humanoid).

**`Parameters:`**
* Instance

## Methods

### `Destroy()`
Destroys the object and performs necessary cleanup tasks.
You usually suppost to fire this manually when your [humanoid](https://create.roblox.com/docs/reference/engine/classes/Humanoid) dies.

### `TakeDamage(container)`
Calculates the damage based on [status effects](./statusEffect.md) and fires a `DamageTaken` event.
Returns the calculated damage.

**`Parameters:`**
* Container: `DamageContainer`

**`Returns`**
 * Container: `DamageContainer` - a container with calculated damage after [status effect](./statusEffect.md) affection.

 ### `PredictDamage(container)`
Calculates the damage based on [status effects](./statusEffect.md).
Returns the calculated damage.

**`Parameters:`**
* Container: `DamageContainer`

**`Returns`**
 * Container: `DamageContainer` - a container with calculated damage after [status effect](./statusEffect.md) affection.

### `SetDefaultProps(props)`
Sets default humanoid properties of the character.

**`Parameters:`**
* Properties: `AffectableHumanoidProps` - A map of a `PropertyName` and its `Value`.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
Char.SetDefaultProps({
    WalkSpeed: 32,
})
```

</TabItem>
<TabItem value="Luau">

```lua
Char:SetDefaultProps({
    WalkSpeed = 32,
})
```

</TabItem>
</Tabs>

### `GetDefaultProps()`
Retrieves the default humanoid properties of the character.

**`Returns`**
 * Properties: `AffectableHumanoidProps` - A map of a `PropertyName` and its `Value`.

### `GetAppliedProps()`
Retrieves the currently applied humanoid properties, depending on current `HumanoidData`.

**`Returns`**
 * Properties: `AffectableHumanoidProps` - A map of a `PropertyName` and its `Value`.

### `GetAllStatusEffects()`
Retrieves all status effects.

### `GetAllActiveStatusEffects()`
Retrieves all active status effects.

### `GetAllStatusEffectsOfType(constructor)`
Retrieves all status effects of a given type.

**`Parameters:`**
* Constructor: `Constructor<AnyStatus>` - A status effect class to check. 

### `GetAllActiveStatusEffectsOfType(constructor)`
Retrieves all active status effects of a specific type.

**`Parameters:`**
* Constructor: `Constructor<AnyStatus>` - A status effect class to check. 

### `HasStatusEffects(statuses)`
Checks if character has any active status effects of the specified type.

**`Parameters:`**
* Statuses: `Constructor<AnyStatus>[]` - A list of status effect classes to check. 

**`Returns`**
 * boolean

### `GetSkills()`
Retrieves the skills stored in the skills object and returns them as an array.

**`Returns`**
 * Skills: `Constructor<AnySkill>[]`
 
### `GetAllActiveSkills()`
Retrieves all active skills and returns them as an array.

**`Returns`**
 * Skills: `Constructor<AnySkill>[]`

### `GetSkillFromString(name)`
Retrieves the skill instance by its name.

**`Parameters:`**
* Name: `string` - a name of the skill.

**`Returns`**
 * Skill: `Skill?`

### `GetSkillFromConstructor(constructor)`
Retrieves a skill instance based on the provided constructor.

**`Parameters:`**
* Constructor: `Constructor<AnySkill>` - A constructor of the skill class.

**`Returns`**
 * Skill: `Skill?`

### `ApplyMoveset(moveset)`
Applies a [Moveset] to the character.

**`Parameters:`**
* Moveset: `Moveset | string` - A [Moveset] object or it's name.

### `GetMoveset()`
Returns the current [Moveset].

**`Returns`**
 * Moveset: `Moveset?`

### `GetMovesetName()`
Returns the current [Moveset]'s name.

**`Returns`**
 * Moveset: `string?`

### `GetMovesetSkills(name?)`
Gets the skills that belong to a provided [Moveset].

**`Parameters:`**
* MovesetName: `string?` - A name of the [Moveset] to get skills from. `@defaults` to the currently applied [Moveset].

### `ClearMoveset()`
Clears the [Moveset] and destroys all skills that belong to it.

### `ApplySkillsFromMoveset(moveset)`
Adds the skills from a given [Moveset].
Does not set the [Moveset].

**`Parameters:`**
* MovesetName: `Moveset` - The [Moveset] to apply from.