---
sidebar_position: 2
---

# Applying abilities

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

To apply your *ability* to a character in **WCS** you need to instantiate *an ability class* providing a `Character Class Instance`.

:::note
If you want to get the `Character Class Instance` from *a model its applied to* you can use a *special static method* provided by **WCS**:
`Character.GetCharacterFromInstance()`.
:::


:::info
If you want to apply/remove multiple abilities at the same time, consider looking into [movesets](../extras/movesets).
:::

Let's modify our *character file/script* to apply our ability:

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
In order to remove an ability from a character you got to call `Destroy()` on its instance.
To get the instance from the name/constructor you can use the following **WCS** APIs:
`Character:GetSkillFromConstructor()`, `Character:GetSkillFromString()`
:::

