---
sidebar_position: 3
---

# Movesets

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Movesets is a *powerful* concept in **WCS**. It allows you to *group/manage* your abilities *easily* by *composing* them into special **WCS** objects.
*Applying a moveset* to the character will *add all skills* the moveset contains to it, *clearing the moveset* or *applying another one*
will *remove them* back.

Let's quickly make a simple *moveset object*:

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
local Skills = require(ReplicatedStorage.Skills)

return WCS.CreateMoveset("Mage", {Skills.Fireball, Skills.Manashot, Skills.Flight})
```

</TabItem>
</Tabs>

Great, now we can *apply* the following moveset to our character:

:::note
Character can only have *1 moveset* applied at a time. If you apply *another moveset*, the previous one will be *cleared*.
To add *all skills* from a moveset *without applying the moveset itself,* you can use the following **WCS** Api: `Character:ApplySkillsFromMoveset()`.
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
To clear character's moveset use an api provided by WCS: `Character:ClearMoveset()`.
:::