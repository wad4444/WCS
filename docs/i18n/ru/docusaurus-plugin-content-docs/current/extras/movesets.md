---
sidebar_position: 3
---

# Мувсеты

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Мувсеты это очередной концепт **WCS**. Он позволяет вам *группировать/сортировать* ваши способности с *легкостью*, *композируя* их в специальные **WCS** объекты.
*Применение мувсета* к персонажу *добавит ему все скиллы*, которые содержит в себе мувсет.
*Сброс мувсета* или *применение другого* снова удалит эти скиллы.

Давайте быстро сделаем *Мувсет*:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="mage.ts" showLineNumbers
import { CreateMoveset } from "@rbxts/wcs";
import { Fireball, Manashot, Flight } from "shared/skills/fireball";

export = CreateMoveset("Mage", [Fireball, Manashot, Flight]);
```

</TabItem>
<TabItem value="Luau">

```lua title="mage.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local WCS = require(ReplicatedStorage.WCS)
local Skills = ReplicatedStorage.Skills

local Fireball = require(Skills.Fireball)
local Manashot = require(Skills.Manashot)
local Flight = require(Skills.Flight)

return WCS.CreateMoveset("Mage", {Fireball, Manashot, Flight})
```

</TabItem>
</Tabs>

Отлично, теперь мы можем *применить* данный мувсет к нашему персонажу:

:::note
Персонаж может иметь только *один мувсет* за раз. Если вы примените *другой мувсет*, то предыдущий будет *очищен*.
Чтобы *добавить* все скиллы из мувсета *без применения его самого*, вы можете использовать специальный метод: `Character:ApplySkillsFromMoveset()`.
:::

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="character.ts" showLineNumbers {10-11}
import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import mage from "shared/mage";

Players.PlayerAdded.Connect((Player) => {
	Player.CharacterAdded.Connect((CharacterModel) => {
		// apply the wrap when character model gets created
		const WCS_Character = new Character(CharacterModel);

		// apply our moveset to the character
		WCS_Character.ApplyMoveset(mage);

		// destroy it when humanoid dies
		const humanoid = CharacterModel.WaitForChild("Humanoid") as Humanoid;
		humanoid.Died.Once(() => WCS_Character.Destroy());
	});
});
```

</TabItem>
<TabItem value="Luau">

```lua title="character.lua" showLineNumbers {13-14}
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local WCS = require(ReplicatedStorage.WCS)
local Mage = require(ReplicatedStorage.Mage)
local Character = WCS.Character

Players.PlayerAdded:Connect(function(Player)
    Player.CharacterAdded:Connect(function(CharacterModel)
    	-- apply the wrap when character model gets created
        local WCS_Character = Character.new(CharacterModel)

	-- apply our moveset to the character
	WCS_Character:ApplyMoveset(Mage)

        -- destroy it when humanoid dies
        local Humanoid = CharacterModel:WaitForChild("Humanoid")
        Humanoid.Died:Once(function()
            WCS_Character:Destroy()
        end)
    end)
end)
```

</TabItem>
</Tabs>

:::info
Чтобы очистить мувсет персонажа используйте метод `Character:ClearMoveset()`.
:::