---
sidebar_position: 1
---

# Концепт Метаданных

**Метаданные** скилла / статус эффекта это по сути состояние, которое реплецируется от *сервера к клиенту*. Для этого существует множество вариантов использования: **Например**, вы можете использовать это, чтобы *сообщить клиенту* *текущий таргет скилла* / или другую информацию с сервера.

:::warning
Изменения **метаданных** отложены.
Если вы измените *метаданные* много раз в один фрейм, то эвент `MetadataChanged` сработает только *один раз* с
*самыми новыми значениями*.
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
Использование вместе со статус эффектами идентично.
:::