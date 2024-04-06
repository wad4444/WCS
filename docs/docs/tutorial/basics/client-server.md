---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Client / Server Setup

Start off your *setup* by creating two special **WCS** objects: `Client` and `Server` handlers.

The objects should register your *directories* *containing skills* and *status effects*.
Provide *the directories* by using `RegisterDirectory` method on both of them.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="server.ts" showLineNumbers
import { ReplicatedStorage } from "@rbxts/services";
import { CreateServer } from "@rbxts/wcs";

const Server = CreateServer();

Server.RegisterDirectory(ReplicatedStorage.TS.movesets);
Server.RegisterDirectory(ReplicatedStorage.TS.skills);
Server.RegisterDirectory(ReplicatedStorage.TS.statusEffects);
```

</TabItem>
<TabItem value="Luau">

```lua title="server.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Server = WCS.CreateServer()

Server:RegisterDirectory(ReplicatedStorage.TS.movesets)
Server:RegisterDirectory(ReplicatedStorage.TS.skills)
Server:RegisterDirectory(ReplicatedStorage.TS.statusEffects)
```

</TabItem>
</Tabs>

Right after, proceed to *start* the handler:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="server.ts" showLineNumbers
Server.Start();
```

</TabItem>
<TabItem value="Luau">

```lua title="server.lua" showLineNumbers
Server:Start()
```

</TabItem>
</Tabs>

Do the same thing on the client side, except use the `CreateClient()` function:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="client.ts" showLineNumbers
import { ReplicatedStorage } from "@rbxts/services";
import { CreateClient } from "@rbxts/wcs";

const Client = CreateClient();

Client.RegisterDirectory(ReplicatedStorage.TS.movesets);
Client.RegisterDirectory(ReplicatedStorage.TS.skills);
Client.RegisterDirectory(ReplicatedStorage.TS.statusEffects);

Client.Start()
```

</TabItem>
<TabItem value="Luau">

```lua title="client.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Client = WCS.CreateClient()

Client:RegisterDirectory(ReplicatedStorage.TS.movesets)
Client:RegisterDirectory(ReplicatedStorage.TS.skills)
Client:RegisterDirectory(ReplicatedStorage.TS.statusEffects)

Client:Start()
```

</TabItem>
</Tabs>