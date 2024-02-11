---
sidebar_position: 2
---

# Define The Behaviour

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Now, after we *[created our first ability](./create-a-skill)* we need to define its *custom behaviour*.
Right now, lets make it *print something* when player *starts the ability*:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill {
	public OnStartServer() {
		print("Hi, attack just started!");
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Attack = WCS.RegisterSkill("Attack")

function Attack:OnStartServer()
	print("Hi, attack just started!")
end

return Attack
```

</TabItem>
</Tabs>

Okay! That's *great* but [let's start our ability](./start-an-ability)!