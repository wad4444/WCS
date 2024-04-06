---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# WCS

<TOCInline toc={toc} />

## `CreateServer()`
Creates a [Server](./server.md) object and returns it.
If called more than once returns the same [server](./server.md) object.

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

**`Returns:`**
* [Server](./server.md)

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

## `CreateMoveset(name, skills)`
Creates a [Moveset](./moveset.md) object and returns it.
Accepts the name and array of skills.

**`Parameters:`**
* Name: `string`
* Skills: ```{AnySkillConstructor}```

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

**`Returns:`**
* [Moveset](./moveset.md)

## `GetMovesetObjectByName(name)`
Retrieves moveset object by its name if registered.

**`Parameters:`**
* Name: `string`

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

**`Returns:`**
* Moveset: [`Moveset?`](./moveset.md)

## `RegisterStatusEffect(name)`
Registers a new [status effect](./statusEffect.md) with name specified in an argument.

**`Parameters:`**
* Name: `string`

```lua
local SpeedBoost = WCS.RegisteredStatusEffect("SpeedBoost")
```

**`Returns:`**
* [StatusEffect](./statusEffect.md)

## `RegisterSkill(name)`
Registers a new [skill](./skill.md) with name specified in an argument.

**`Parameters:`**
* Name: `string`

```lua
local Attack = WCS.RegisterSkill("Attack")
```

**`Returns:`**
* [Skill](./skill.md)

## `Character`
An exported [character](./character.md) class. Cannot be changed.

## `SkillType`
An exported skill type enum.


`Members:`
```
Default,
Holdable
```
