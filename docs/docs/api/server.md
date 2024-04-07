---
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# Server

<TOCInline toc={toc} />

## `RegisterDirectory(directory)`
Requires all [module scripts](https://create.roblox.com/docs/reference/engine/classes/ModuleScript) in a directory when server starts.
Can only be called *before* server has started.

**`Parameters:`**
* Directory: `Instance`

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Server = CreateServer();
Server.RegisterDirectory(ReplicatedStorage.TS.statusEffects)
```

</TabItem>
<TabItem value="Luau">

```lua
local Server = WCS.CreateServer()
Server:RegisterDirectory(game.ReplicatedStorage.statusEffects)
```

</TabItem>
</Tabs>



## `Start()`
Starts the handler.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Server = CreateServer();
Server.Start();
```

</TabItem>
<TabItem value="Luau">

```lua
local Server = WCS.CreateServer()
Server:Start()
```

</TabItem>
</Tabs>

## `IsActive()`
Returns `true` if the server has started.

**`Returns:`**
* boolean

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Server = CreateServer();
Server.IsActive();
```

</TabItem>
<TabItem value="Luau">

```lua
local Server = WCS.CreateServer()
Server:IsActive()
```

</TabItem>
</Tabs>
