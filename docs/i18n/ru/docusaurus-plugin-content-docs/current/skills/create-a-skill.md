---
sidebar_position: 1
---

# Создайте скилл

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Способность/скилл в **WCS** это *класс* который, при создании, связывается с *персонажем*. Чтобы задать логику скиллам, вам нужно переопределять стандартные методы.
Давайте сделаем файл/скрипт `attack` и зарегестрируем нашу *первую способность*:

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

Вот как *просто* можно создавать способности! Стоит упомянуть, что именно тут появляется первое *синтаксическое различие* между
тайпскриптом и луау. *Список всех* различий вы можете наблюдать [*на этой странице*](../extras/differences).