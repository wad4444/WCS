---
sidebar_position: 4
---

# Применение статусов

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Применение статусов к *персонажам* очень похоже на *добавление скилов*.
Чтобы применить свой *статус* к персонажу в **WCS**, тебе необходимо создать *новый экземпляр* твоего статуса и передать в аргументы *обёртку твоего персонажа*.

:::note
Если вы хотите получить `экземпляр класса персонажа` из *модели, к которой он был применён*, то вы можете воспользоваться *специальным статическим методом*, предоставляемым **WCS**:
`Character.GetCharacterFromInstance()`.
:::

Давайте сделаем так, чтобы какая-нибудь способность прибавляла скорости при использовании:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="dash.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SpeedBoost } from "shared/statusEffects/speedBoost";

@SkillDecorator
export class Dash extends Skill {
	public OnStartServer() {
		const speedBoost = new SpeedBoost(this.Character);
		speedBoost.Start(5);
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="dash.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local SpeedBoost = require(ReplicatedStorage.StatusEffects.SpeedBoost)
local Dash = WCS.RegisterSkill("Dash")

function Dash:OnStartServer()
	local speedBoost = SpeedBoost.new(self.Character)
	speedBoost:Start(5)
end

return Dash
```

</TabItem>
</Tabs>

:::info
Вы можете *безопасно* создать экземпляр *статус эффекта на клиенте*, но они *не будут прореплицированы* и они будут *видны только методам клиентского персонажа*.
:::

:::note
Вы можете вызвать `Start()` без указания времени действия, но вам придется остановить эффект методом `Stop()` вручную.
:::

:::warning
Для предотвращения *утечки памяти* **WCS** вызывает метод `Destroy()` для статус эффекта автоматически, когда он останавливается.
Вы можете установить `DestroyOnEnd` на значение false внутри `OnConstructServer()` чтобы это предотвратить, 
но вам придется вызвать метод `Destroy()` вручную.
:::