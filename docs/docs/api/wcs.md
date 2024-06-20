---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# WCS

[Moveset]: ../tutorial/extras/movesets.md

<TOCInline toc={toc} />

## `CreateServer()`
Creates a [Server](./server.md) object and returns it.
If called more than once returns the same [server](./server.md) object.

**`Returns:`**
* [Server](./server.md)

## `CreateClient()`
Creates a [Client](./client.md) object and returns it.
If called more than once returns the same [client](./client.md) object.

**`Returns:`**
* [Client](./client.md)

## `RegisterStatusEffect(name)`
Registers a new [status effect](./statusEffect.md) with name specified in an argument.

**`Parameters:`**
* Name: `string`

**`Returns:`**
* [StatusEffect](./statusEffect.md)

## `RegisterSkill(name)`
Registers a new [skill](./skill.md) with name specified in an argument.

**`Parameters:`**
* Name: `string`

**`Returns:`**
* [Skill](./skill.md)

## `DefineMessage(fn, config)`
Registers a [message](../tutorial/messages/intro.md).

**`Parameters:`**
* Function: `function`
* Config: `MessageConfig`

## `Character` @readonly
An exported [character](./character.md) class.

## `CreateMoveset(name, skills, constructorArgs)`
Creates a [Moveset] object and returns it.
Accepts the name and array of skills.

**`Parameters:`**
* Name: `string`
* Skills: ```{AnySkillConstructor}```
* ConstructorArguments: ```{[string | SkillImpl]: any[]}``` - an object that contains array of `ConstructorArguments` that skill should get instantiated with.

**`Returns:`**
* [Moveset]

## `GetMovesetObjectByName(name)`
Retrieves [Moveset] object by its name if registered.

**`Parameters:`**
* Name: `string`

**`Returns:`**
* Moveset: [`Moveset?`](../tutorial/extras/movesets.md)

## `SkillType`
An exported skill type enum.

`Members:`
```
Default,
Holdable
```
