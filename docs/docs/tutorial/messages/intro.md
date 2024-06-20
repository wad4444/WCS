---
sidebar_position: 1
---

# Introduction

Messages is a powerful concept in **WCS** that allows the *client* and *server* sides of your ability to **communicate** between eachother.
Technically, message is just a [RemoteEvent](https://create.roblox.com/docs/scripting/events/remote) or a [RemoteFunction](https://create.roblox.com/docs/scripting/events/remote) call,
depending on the message `Type`. Messages allow you to set up **communication** between the client and server sides of an ability, enabling you to retrieve *various types of data* or notify the other side of an *event* that it should react to.

From version `2.0.0` you can define a message by calling a special function **WCS** exports - `WCS.DefineMessage`.
The function takes 2 arguments:
* *Your message method* - a **function**, that should be a valid method of your ability.
* *A config*, that defines **the behavior** of your message.

The config consists of:
* **Type** - can be `"Event"` or `"Request"`.
* **Destination** - can be `"Server"` or `"Client"`. Determines where you're *sending* message to.
* **Unreliable** - a boolean value. If the type is `"Event"`, determines if should be fired through [UnreliableRemoteEvent](https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent).
* **Validators?** - an array of functions that validate your arguments.
* **ValueValidator?** - a validator for return value of a function. Can only be specified if `Type` is set to `Request`.
:::danger
You should **always** validate your arguments manually when receiving messages from *client*. They act like regular *remote calls* and exploiters can send invalid data.
:::
