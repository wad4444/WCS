---
sidebar_position: 1
---

# Создание Статус Эффекта

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

*Статус-Эффекты* в **WCS** это классы, которые представляют собой *сайд-эффекты*. Их использование схоже с использованием скиллов, вы *также определяете их поведение* путём переопределения дефолтных методов. WCS также предоставляет *полезные инструменты* для манипуляции *статами хуманоида*.

К примеру, это может быть *полезно*, если вам нужно *запретить игроку двигаться*, пока на него наложен *стан*.

Давайте зарегестрируем простой статус эффект и заставим вывести в консоль что-нибудь при запуске игры:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Stun extends StatusEffect {
	public OnStartServer() {
		print("Stun just started!")
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Stun = WCS.RegisterStatusEffect("Stun")

function Stun:OnStartServer()
	print("Stun just started!")
end

return Stun
```

</TabItem>
</Tabs>
