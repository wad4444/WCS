---
sidebar_position: 3
---

# Validating Data

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Technically, messages are just regular `RemoteEvent` / `RemoteFunction` calls, meaning that exploiters can send **invalid data** to function that run on server.
To prevent that, **WCS** provides a way to *attach validators* to message arguments in your **message config**.

**Validator** is *a regular function* that accepts `an argument` and returns a `boolean` value.
We'll be using [a library called `t`](https://github.com/osyrisrblx/t) in this example to *validate arguments*.

To attach *validators* to a message, you need to specify them inside your *message config*:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers {9}
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { t } from "@rbxts/t";

@SkillDecorator
export class Attack extends Skill {
    @Message({
        Type: "Event",
        Destination: "Client",
        Validators: [t.number, t.string],
    })
    protected printSomething(a: number, b: string) {
        print(a,b);
    }
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers {13}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)
local t = require(ReplicatedStorage.t)

local Attack = WCS.RegisterSkill("Attack")

function Attack:printSomething(a,b)
    print(a,b)
end
WCS.DefineMessage(Attack.printSomething, {
    Type = "Event",
    Destination = "Client",
    Validators = {t.number, t.string},
})

return Attack
```

</TabItem>
</Tabs>

Each index in the `Validators` array *corresponds* to a *function argument*. From now, message calls that contain *invalid arguments* will be **rejected**.