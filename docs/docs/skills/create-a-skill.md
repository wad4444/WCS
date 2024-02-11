---
sidebar_position: 1
---

# Create an ability

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

It's a common thing to question how do you create an ability with **WCS**.

A **WCS** ability/skill is a *class* that when instantiated gets bound to a *character*. To define the behaviour of your ability you override the default methods.
Let's make a file/script `attack` and register our *first ability*:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill {}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Attack = WCS.RegisterSkill("Attack")

return Attack
```

</TabItem>
</Tabs>

Here is how *simple* you create a whole new ability! Worth to mention, this is where you get first *syntactical difference* between
typescript and luau. *Here* is where you can view all [*syntactical differences*](../extras/differences).