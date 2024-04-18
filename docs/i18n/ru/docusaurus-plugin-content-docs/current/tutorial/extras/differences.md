---
sidebar_position: 2
---

# Синтаксические различия

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Есть пару *синтаксических различий* в **WCS** между версией *Luau* и версией *TypeScript*.

Одним из самых важных является то, как экспортируются *классы*.

Классы в **WCS** используются для определения *статус эффектов* или *скиллов*.

В `TypeScript` модуль **WCS** явно экспортирует классы `Skill` `StatusEffect` и `HoldableSkill` которые вы должны *задекорировать* и *пронаследовать*.

*Однако*, из-за *сложного синтаксиса* в Luau **WCS** экпортирует специальные `методы-обёртки`, которые определяют *новый класс* и *применяют декоратор* внутри: `RegisterSkill()`, `RegisterStatusEffect()`, `RegisterHoldableSkill()`.

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
