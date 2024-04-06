---
sidebar_position: 3
---

# Define The Behavior

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Now, after we *[created our first ability](./create-a-skill)* we need to define its *custom behavior*.
Right now, lets make it *print something* when player *starts the ability* and add a small cooldown for it:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers {6-7}
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill {
	public OnStartServer() {
		print("Hi, attack just started!");
		this.ApplyCooldown(3) // 3 second cooldown
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers {7-8}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Attack = WCS.RegisterSkill("Attack")

function Attack:OnStartServer()
	print("Hi, attack just started!")
	self:ApplyCooldown(3) -- 3 second cooldown
end

return Attack
```

</TabItem>
</Tabs>

Okay! That's *great*, but [let's start our ability](./start-an-ability)!