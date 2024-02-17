---
sidebar_position: 3
---

# Configuring Humanoid Data

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

To set the *Humanoid Data* of your *status effect* you can use a built-in method `SetHumanoidData()`.
Let's modify our *stun status* to set the player's `WalkSpeed` to zero.

:::note
You can use `SetHumanoidData()` method on client, however the changes will be overriden with a next server change of `Humanoid Data`.
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
	self:SetHumanoidData({ WalkSpeed: {0, "Set" } })
end

return Stun
```

:::warning
Luau types for `Humanoid Data` are not accurate, the value of a property is represented as `{number, "Set" | "Increment"}`.
It is currently impossible to type specific indexes of an array unlike typescript, so you will be faced with an error if you provide
the arguments in the wrong order.
:::

</TabItem>
</Tabs>