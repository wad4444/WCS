---
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Character Setup

**WCS** provides a special `Character` class that acts as a *wrapper* for a player's character model.
You should instantiate this class whenever *a character* that will take action in combat spawns.
 - To avoid **memory leaks** always destroy the wrap when the humanoid dies.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="character.ts" showLineNumbers
import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";

Players.PlayerAdded.Connect((Player) => {
	Player.CharacterAdded.Connect((CharacterModel) => {
		// apply the wrap when character model gets created
		const WCS_Character = new Character(CharacterModel);

		// destroy it when humanoid dies
		const humanoid = CharacterModel.WaitForChild("Humanoid") as Humanoid;
		humanoid.Died.Once(() => WCS_Character.Destroy());
	});
});
```

</TabItem>
<TabItem value="Luau">

```lua title="character.lua" showLineNumbers
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local WCS = require(ReplicatedStorage.WCS)
local Character = WCS.Character

Players.PlayerAdded:Connect(function(Player)
    Player.CharacterAdded:Connect(function(CharacterModel)
    	-- apply the wrap when character model gets created
        local WCS_Character = Character.new(CharacterModel)

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