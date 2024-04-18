---
sidebar_position: 8
---

# Сообщения

Сообщения в **WCS** позволяют общаться между собой *клиентской* и *серверной* частями скилла.
Представляйте их как обычные ремоут эвенты: когда клиент отправляет сообщение с помощью метода `SendMessageToServer()`, сервер может обработать его
в своём методе `HandleClientMessage()` и наоборот.

:::danger
Вы должны **всегда** проверять аргументы, когда обрабатываете *клиентский запрос*: они ведут себя как обычные *ремоут эвенты* и *читеры* *смогут отправлять поддельные данные*.
:::

Вот *простой пример*, как можно наладить коммуникацию между *серверной* и *клиентской* частью скилла:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill<void, [], void, number> {
	public OnStartServer() {
		this.SendMessageToClient(math.random(1, 5));
	}

	public HandleServerMessage(combo: number) {
		print(`Combo x${combo}!`);
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Attack = WCS.RegisterSkill("Attack")

function Attack:OnStartServer()
	self:SendMessageToClient(math.random(1, 5))
end

function Attack:HandleServerMessage(combo)
	print(`Combo x{combo}`)
end

return Attack
```

</TabItem>
</Tabs>