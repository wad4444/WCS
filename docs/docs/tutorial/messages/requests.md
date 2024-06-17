---
sidebar_position: 4
---

# Requests

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

**Messages** also allow you to **request** *data* from the receiver. *In order to do that*, we'll utilize *a message type* called `Request`. 
Usually, a function with *message type* set to `Request` is suppost to return *a value*.  You can validate a `value` your message function returns using
`ValueValidator`.

:::note
**Important thing to note** is that a value returned by your message function is always **promisified**. If you *return a promise* from a function,
**WCS** will use that promise instead.
:::
[&rarr; You can read more about promises here.](https://eryn.io/roblox-lua-promise/)

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers {12}
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { t } from "@rbxts/t";

@SkillDecorator
export class Attack extends Skill {
    protected OnStartServer() {
        const [worked, value] = this.printSomething().await();
        if (worked) print(value);
    }

    @Message({
        Type: "Request",
        Destination: "Client",
        ValueValidator: t.number,
    })
    protected async printSomething() {
        return math.random(1,5);
    }
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers {11}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)
local t = require(ReplicatedStorage.t)

local Attack = WCS.RegisterSkill("Attack")

function Attack:OnStartServer()
    local worked, value = self:getSomething():await()
    if worked then
        print(value)
    end
end

function Attack:getSomething()
    return math.random(1,5)
end
WCS.DefineMessage(Attack.printSomething, {
    Type = "Request",
    Destination = "Client",
    ValueValidator = t.number,
})

return Attack
```

</TabItem>
</Tabs>

:::note
*The promise* returned by a message function can **timeout** or **fail**. If arguments are **invalid** the promise **will reject**.
:::