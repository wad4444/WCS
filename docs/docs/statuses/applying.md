---
sidebar_position: 4
---

# Applying a status

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Applying statuses to *characters* is very similar to *applying abilities*.
To apply your *status* to a character in **WCS** you need to instantiate *the status class* providing a `Character Class Instance`.

:::note
If you want to get the `Character Class Instance` from *a model its applied to* you can use a *special static method* provided by **WCS**:
`Character.GetCharacterFromInstance()`.
:::

Let's make some ability give us a speed boost upon using:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="dash.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SpeedBoost } from "shared/statusEffects/speedBoost";

@SkillDecorator
export class Attack extends Skill {
	public OnStartServer() {
		const speedBoost = new SpeedBost(this.Character);
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
local Attack = WCS.RegisterSkill("Attack")

function Attack:OnStartServer()
	local speedBoost = SpeedBoost.new(self.Character)
	speedBoost:Start(5)
end

return Attack
```

</TabItem>
</Tabs>

:::info
You can *safely* instantiate *status effects on client*, but they will *not be replicated* and will *only be visible* to client character *apis*.
:::

:::note
You can invoke `Start()` without providing a time limit, but you will have to call `Stop()` manually.
:::

:::warning
To prevent *memory leaks* **WCS** calls `Destroy()` on a *status effects* automatically when it ends.
You can set `DestroyOnEnd` to false inside `OnStartServer()` to change that behavior, but you will have to
call `Destroy()` manually.
:::