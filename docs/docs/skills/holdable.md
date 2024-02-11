---
sidebar_position: 7
---

# Holdable Abilities

Sometimes, you wanna *create an* **ability** that you can use for *an* **unknown** *amount* of time, which depends on *user input*.

**WCS** introduces a whole new ability type for this case: `HoldableSkill`, which you can specify the max hold time of and run the callbacks
whenever it ends like on a regular ability.

Let's make a file called `block` and register a holdable ability:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="block.ts" showLineNumbers
import { HoldableSkill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Block extends HoldableSkill {}
```

</TabItem>
<TabItem value="Luau">

```lua title="block.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Block = WCS.RegisterHoldableSkill("Block")

return Block
```

</TabItem>
</Tabs>

Then set the *max hold duration* to *undefined*, so we could *hold the block* infinitely.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="block.ts" showLineNumbers {5-7}
import { HoldableSkill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Block extends HoldableSkill {
	public OnConstructServer() {
		this.SetMaxHoldDuration(undefined);
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="block.lua" showLineNumbers {6-8}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Block = WCS.RegisterHoldableSkill("Block")

function BLock:OnConstructServer()
	this:SetMaxHoldDuration(nil)
end

return Block
```

</TabItem>
</Tabs>

:::note
You can determine if the ability is holdable or not by calling `GetSkillType()`
:::