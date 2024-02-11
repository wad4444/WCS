---
sidebar_position: 1
---

# Create a status effect

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

*Status Effects* in **WCS** are classes that represent *side-effects*. The usage is very similar to skills, you also *define their behavior by*
 overriding *default methods*. They also provide *useful tooling* for manipulating *roblox humanoid stats*, e.g, setting the walkspeed 
when the player should be stunned.

Let's register a simple status effect:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Stun extends StatusEffect {}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Stun = WCS.RegisterStatusEffect("Stun")

return Stun
```

</TabItem>
</Tabs>