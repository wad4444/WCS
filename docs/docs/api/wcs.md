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

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Server = CreateServer();
```

</TabItem>
<TabItem value="Luau">

```lua
local Server = WCS.CreateServer()
```

</TabItem>
</Tabs>

## `CreateClient()`
Creates a [Client](./client.md) object and returns it.
If called more than once returns the same [client](./client.md) object.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Client = CreateClient();
```

</TabItem>
<TabItem value="Luau">

```lua
local Client = WCS.CreateClient()
```

</TabItem>
</Tabs>

**`Returns:`**
* [Client](./client.md)

## `RegisterStatusEffect(name)`
Registers a new [status effect](./statusEffect.md) with name specified in an argument.

**`Parameters:`**
* Name: `string`

**`Returns:`**
* [StatusEffect](./statusEffect.md)

```lua
local SpeedBoost = WCS.RegisteredStatusEffect("SpeedBoost")
```

## `RegisterSkill(name)`
Registers a new [skill](./skill.md) with name specified in an argument.

**`Parameters:`**
* Name: `string`

**`Returns:`**
* [Skill](./skill.md)

```lua
local Attack = WCS.RegisterSkill("Attack")
```

## `Character`
An exported [character](./character.md) class. Cannot be changed.

## `CreateMoveset(name, skills)`
Creates a [Moveset] object and returns it.
Accepts the name and array of skills.

**`Parameters:`**
* Name: `string`
* Skills: ```{AnySkillConstructor}```

**`Returns:`**
* [Moveset]

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Moveset = CreateMoveset("Mage", [Attack]);
```

</TabItem>
<TabItem value="Luau">

```lua
local Client = WCS.CreateMoveset("Mage", {Attack})
```

</TabItem>
</Tabs>

## `GetMovesetObjectByName(name)`
Retrieves [Moveset] object by its name if registered.

**`Parameters:`**
* Name: `string`

**`Returns:`**
* Moveset: [`Moveset?`](../tutorial/extras/movesets.md)

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Moveset = GetMovesetObjectByName("Mage");
```

</TabItem>
<TabItem value="Luau">

```lua
local Moveset = WCS.GetMovesetObjectByName("Mage")
```

</TabItem>
</Tabs>

## `SkillType`
An exported skill type enum.


`Members:`
```
Default,
Holdable
```
