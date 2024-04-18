---
sidebar_position: 3
---

# Написание логики

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Теперь, когда мы *[создали нашу первую способность](./create-a-skill)*, нам нужно написать *логику* для неё.
Давайте на простом примере *законсолим какую-нибудь строку* когда игрок *активирует способность* и добавим маленький откат:

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

Отлично! Теперь нам осталось [запустить нашу способность](./start-an-ability)!