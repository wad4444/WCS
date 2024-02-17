---
sidebar_position: 2
---

# Добавление скиллов

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Чтобы добавить *способность* к персонажу в **WCS**, вам нужно создать экземпляр *класса данной способности*, передав в него экземпляр класса-обертки `Character`.

:::note
Если вы хотите получить класс-обертку `Character` через *модель, к которой он прикреплен* вы можете воспользоваться *специальным статическим методом* **WCS**:
`Character.GetCharacterFromInstance()`.
:::


:::info
Если вы хотите добавить/убрать много способностей за раз, вы можете использовать [мувсеты](../extras/movesets).
:::

Давайте изменим наш *файл/скрипт*, чтобы к персонажу добавлялась новая способность:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="character.ts" showLineNumbers {10-11}
import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import { Attack } from "shared/attack";

Players.PlayerAdded.Connect((Player) => {
	Player.CharacterAdded.Connect((CharacterModel) => {
		// apply the wrap when character model gets created
		const WCS_Character = new Character(CharacterModel);

		// apply our freshly made skill
		new Attack(WCS_Character);

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
local Attack = require(ReplicatedStorage.Attack)
local Character = WCS.Character

Players.PlayerAdded:Connect(function(Player)
    Player.CharacterAdded:Connect(function(CharacterModel)
    	-- apply the wrap when character model gets created
        local WCS_Character = Character.new(CharacterModel)
		
	-- apply our freshly made skill
	Attack.new(WCS_Character)

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

:::note
Чтобы удалить *способность* у персонажа вы должны вызвать метод `Destroy()` на её экзэмпляре.
Чтобы получить *экземпляр способности* имея *конструктор* или *имя способности* вы можете воспользоваться следующими методами **WCS**:
`Character:GetSkillFromConstructor()`, `Character:GetSkillFromString()`
:::

