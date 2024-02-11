---
sidebar_position: 6
---

# Messages

Messages is a powerful concept in **WCS** that allows the *client* and *server* sides of your ability to **communicate** between eachother.
Think of them as regular remote calls: when client sends a message using `SendMessageToServer()`, server can handle it inside `HandleClientMessage()` 
method and vise versa.

:::danger
You should **always** validate your arguments manually when receiving messages from *client*. They act like regular *remote calls* and exploiters can send invalid data.
:::

Here is a *simple example* how would you implement messages inside *an ability*:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill<void, [], void, number> {
	public OnStartServer() {
		this.SendMessageToClient(math.random(1, 5));
	}

	public HandleServerMessage(combo: number) {
		print(`Combo x${combo}!`);
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
	self:SendMessageToClient(math.random(1, 5))
end

function Attack:HandleServerMessage(combo)
	print("Combo x"...combo..."!")
end

return Attack
```

</TabItem>
</Tabs>