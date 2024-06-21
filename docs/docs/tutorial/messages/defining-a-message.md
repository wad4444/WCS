---
sidebar_position: 2
---

# Defining a Message

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Let's start with defining our *first* message.
In order to do that we need to create *a custom method* that is going to be **a basis** for our message.
Let's make a *simple custom method* that calls a `print` function.

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill {
    protected printSomething(a: number, b: string) {
        print(a,b);
    }
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Attack = WCS.RegisterSkill("Attack")

function Attack:printSomething(a,b)
    print(a,b)
end

return Attack
```

</TabItem>
</Tabs>

We defined our custom method called `printSomething`. Now, all we need to do is call `WCS.DefineMessage` on that specific function:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

:::note
To define a message in `TypeScript` you need to use `@Message()` decorator factory.
:::

```ts title="attack.ts" showLineNumbers
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill {
    @Message({
        Type: "Event",
        Destination: "Client",
    })
    protected printSomething(a: number, b: string) {
        print(a,b);
    }
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Attack = WCS.RegisterSkill("Attack")

function Attack:printSomething(a,b)
    print(a,b)
end
WCS.DefineMessage(Attack.printSomething, {
    Type = "Event",
    Destination = "Client",
})

return Attack
```

</TabItem>
</Tabs>

From now, if we call `printSomething()` on server, it will be passed to *a remote event* and invoked on client.
The following method will be invoked on client:

<Tabs groupId="languages">
<TabItem value="TypeScript" default>

```ts title="attack.ts" showLineNumbers {7}
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class Attack extends Skill {
    //...TRUNCATED...
    public OnStartServer() {
        this.printSomething(1, "hi")
    }
}
```

</TabItem>
<TabItem value="Luau">

```lua title="attack.lua" showLineNumbers {7}
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local WCS = require(ReplicatedStorage.WCS)

local Attack = WCS.RegisterSkill("Attack")
-- ...TRUNCATED...
function Attack:OnStartServer()
    self:printSomething(1, "hi")
end

return Attack
```

</TabItem>
</Tabs>