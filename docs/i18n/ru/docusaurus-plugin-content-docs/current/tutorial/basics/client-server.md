---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Настройка Клиента/Сервера

Начните *интеграцию **WCS** в ваш проект* создав два специальных объекта: `Client` и `Server` обработчики.

Обработчики должны регистрировать ваши *директории* *со способностями* и *статус эффектами*.
Передайте *директории* в обработчик используя метод `RegisterDirectory`.

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

Server:RegisterDirectory(ReplicatedStorage.movesets)
Server:RegisterDirectory(ReplicatedStorage.skills)
Server:RegisterDirectory(ReplicatedStorage.statusEffects)
```

</TabItem>
</Tabs>

После чего *запустите* обработчик:

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

Проделайте все также на клиенте использовав функцию `CreateClient()`:

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