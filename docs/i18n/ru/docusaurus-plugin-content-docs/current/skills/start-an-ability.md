---
sidebar_position: 5
---

# Запуск способностей

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Давайте *забиндим* нашу способность на какую-то *клавишу*.
Чтобы это сделать, нам нужно изменить наш скрипт/файл `client` и добавить
*прослушку нажатия* на клавиши, после чего *запускать код*, если *нужная* клавиша нажата:

Код получает *[класс-обертку персонажа](replication-explained.md)* и *активирует полученную способность*:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="client.ts" showLineNumbers
import { Players, UserInputService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import { Attack } from "shared/skills/attack";

// get the replicated character wrap of local player's current character
function getCurrentWCS_Character() {
	const characterModel = Players.LocalPlayer.Character;
	if (!characterModel) return;

	return Character.GetCharacterFromInstance(characterModel);
}

UserInputService.InputBegan.Connect((Input, GameProcessed) => {
	if (GameProcessed) return;
	if (Input.UserInputType === Enum.UserInputType.MouseButton1) {
		// get and start the "attack" when we left click
		const character = getCurrentWCS_Character();
		character?.GetSkillFromConstructor(Attack)?.Start();
	}
});
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local WCS = require(ReplicatedStorage.WCS)
local Attack = require(ReplicatedStorage.Skills.Attack)
local Character = WCS.Character

function getCurrentWCS_Character()
	local characterModel = Players.LocalPlayer.Character
	if not characterModel then return end

	return Character.GetCharacterFromInstance(characterModel)
end

UserInputService.InputBegan:Connect(function(Input, GameProcessed)
	if GameProcessed then return end
	if Input.UserInputState ~= Enum.UserInputState.Begin then return end

	if Input.UserInputType == Enum.UserInputType.MouseButton1 then
		local character = getCurrentWCS_Character()
		if not character then return end

		character:GetSkillFromConstructor(Attack):Start()
	end
end)
```

</TabItem>
</Tabs>

:::note
Нужно помнить, что *вызывая* методы `Start` или `End` на клиенте вы просто производите *запрос на сервер* для вызова методов.
:::