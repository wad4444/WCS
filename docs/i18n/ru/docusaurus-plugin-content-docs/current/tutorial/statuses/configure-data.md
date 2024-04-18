---
sidebar_position: 3
---

# Настройка Humanoid Data

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Чтобы установить *хуманоид дату* вашего *статус эффекта* вы можете использовать встроенный метод `SetHumanoidData()`.
Давайте изменим наш *стан* так, чтобы он устанавливал `WalkSpeed` игрока на *ноль*.

:::note
Вы **можете** использовать метод `SetHumanoidData()` на клиенте, но изменения будут *перезаписаны* со следующим изменением `Humanoid Data` на сервере.
:::

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers {6-6}
import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Stun extends StatusEffect {
	public OnStartServer() {
		this.SetHumanoidData({ WalkSpeed: [0, "Set"] })
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers {7-7}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Stun = WCS.RegisterStatusEffect("Stun")

function Stun:OnStartServer()
	self:SetHumanoidData({ WalkSpeed = {0, "Set" } })
end

return Stun
```

:::warning
Луау типы не правильно отражают `Humanoid Data`, значение поле типизировано как `{number, "Set" | "Increment"}`.
В отличии от тайпскрипта, в луау на данный момент невозможно типизировать отдельные индексы таблицы.
Это означает, что если вы укажите значения в неправильном порядке, то вам выкинет ошибку.
:::

</TabItem>
</Tabs>