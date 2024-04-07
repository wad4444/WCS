---
sidebar_position: 2
---

# Syntactical Differences

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

There are several *syntactical differences* in **WCS** between *Luau* version and *TypeScript* version.

One of *the most big* being how *classes* are exported.
Classes in **WCS** are used to define your *status effect* or *an ability*.
In TypeScript *package version* **WCS** explicitly exports classes `Skill`, `StatusEffect` and `HoldableSkill`
that you should decorate and *extend* from.

*However*, due to the *funky emit syntax* in Luau **WCS** exports special "wrapper" methods that
define *a new class* and *apply the decorator* internally: `RegisterSkill()`, `RegisterStatusEffect()`, `RegisterHoldableSkill()`.

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
