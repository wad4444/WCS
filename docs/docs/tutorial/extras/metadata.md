---
sidebar_position: 1
---

# Concept of Metadata

**Metadata** of a skill / statusEffect is *basically a* **state** that is replicated from *server to client*.
There are many use cases to this: **For example**, you can use this to *tell the client* the *current skill target* / or some
other information from the server.

:::warning
**Metadata** changes are **deferred**, so if you change it multiple times in a single heartbeat tick the `MetadataChanged` event
will only be fired once with the latest changes.
:::

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill<void, [], number> {
	public OnStartServer() {
		task.wait(2)
		this.SetMetadata(5);
	}

	// this method is getting invoked when the class gets instantiated
	public OnConstructClient() {
		this.MetadataChanged.Connect((NewMeta) => print(NewMeta));
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
	task.wait(2)
	self:SetMetadata(5)
end

-- this method is getting invoked when the class gets instantiated
function Attack:OnConstructClient()
	self.MetadataChanged:Connect(function(NewMeta)
		print(NewMeta)
	end)
end

return Attack
```

</TabItem>
</Tabs>

:::note
The usage with status effects is the same.
:::