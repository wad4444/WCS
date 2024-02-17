---
sidebar_position: 7
---

# "Продолжительные" способности

Иногда бывает так, что вам нужно *создать способность*, которая будет действовать *неопределенное количество времени*, которое зависит
от *действий пользователя*.

**WCS** экспортирует *новый тип способностей* для выполнения данной задачи: `HoldableSkill`.
Вы можете указать *максимальное время действия* этой способности, или *закончить её досрочно*, вызвав метод `End()`

Давайте сделаем скрипт/файл `block` и зарегистрируем способность:

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

Теперь установим *максимальное время работы* на `undefined`, чтобы мы могли держать блок *бесконечно*.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="block.ts" showLineNumbers {5-7}
import { HoldableSkill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Block extends HoldableSkill {
	public OnConstructServer() {
		this.SetMaxHoldTime(undefined);
	}
}
```

</TabItem>
<TabItem value="Luau">

```lua title="block.lua" showLineNumbers {6-8}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Block = WCS.RegisterHoldableSkill("Block")

function Block:OnConstructServer()
	self:SetMaxHoldTime(nil)
end

return Block
```

</TabItem>
</Tabs>

:::note
Вы можете получить *тип способности* использовав метод `GetSkillType()`.
:::