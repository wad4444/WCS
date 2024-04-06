---
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# Client

<TOCInline toc={toc} />

## `RegisterDirectory(directory)`
Requires all [module scripts](https://create.roblox.com/docs/reference/engine/classes/ModuleScript) in a directory when client starts.
Can only be called *before* client has started.

**`Parameters:`**
* Directory: `Instance`

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.TS.statusEffects)
```

</TabItem>
<TabItem value="Luau">

```lua
local Client = WCS.CreateClient()
Client:RegisterDirectory(game.ReplicatedStorage.statusEffects)
```

</TabItem>
</Tabs>

## `Start(attachDevTools)`
Starts the handler.

**`Parameters:`**
* attachDevTools: `boolean?` If true, attaches [**Reflex DevTools**](https://github.com/jackTabsCode/reflex-devtools) middleware upon starting

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Client = CreateClient();
Client.Start();
```

</TabItem>
<TabItem value="Luau">

```lua
local Client = WCS.CreateClient()
Client:Start()
```

</TabItem>
</Tabs>

## `IsActive()`
Returns `true` if the client has started.

**`Returns:`**
* boolean

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts
const Client = CreateClient();
Client.IsActive();
```

</TabItem>
<TabItem value="Luau">

```lua
local Client = WCS.CreateClient()
Client:IsActive()
```

</TabItem>
</Tabs>
