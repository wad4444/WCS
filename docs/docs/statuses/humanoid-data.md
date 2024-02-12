---
sidebar_position: 2
---

# Humanoid Data

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

Now, let's apply a new *side effect* to our *status*. When the *stun* is active on our *character* we want to set its
`WalkSpeed` and `JumpPower` to *zero*. **WCS** provides special tooling to manage your *humanoid props*, here is a *brief explanation* of how it works:

## What is Humanoid Data?
`Humanoid Data` in **WCS** is a `Map` where:
 - `Key` is one of the available humanoid property names:
   - WalkSpeed, JumpPower, JumpHeight, AutoRotate
 - `Value` is an array, where:
   - First element is the *property* `value`.
   - Second element is the `Mode` that *this specific prop* will get applied with.
 - `Priority` is a value that you can specify upon setting the `Humanoid Data`, it is used to resolve conflicts between different statuses. 

:::note
  If you don't provide priority value when setting new `Humanoid Data`, it will be automatically set to 1.
:::

## What is The Mode?
There are only 2 different property appliement `modes` in **WCS**: `Increment` and `Set`.

### Increment

Let's say we have *a status effect* that *slows us down* by 5.
Its `Humanoid Data` should look like this:
```lua
{ WalkSpeed = {-5, "Increment"} }
```
If the mode is set to `Increment`, the property value will be summarized with the other sources:
So, if we have 2 slowness effects applied to our character, the slowness from them will be summarized.

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/slowness10-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/slowness10-dark.png'),
  }}>
</ThemedImage>

### Set

`Set` explicitly sets the property value and ignores any incrementation:
```lua
{ WalkSpeed = {-5, "Set"} }
```
If the mode is set to `Set`, property value will be set to `-5`, and not get affected by any increments:
So, if we have *a slowness effect* and an effect that *explicitly sets* the `WalkSpeed` value *applied to our character*,
the slowness will be ignored.

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/slowness-set-0-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/slowness-set-0-dark.png'),
  }}>
</ThemedImage>

**However**, if 2 *different* status effect that `Set` the *same property value* get *applied to the character*,
**WCS** will prioritize the one, which `Priority` is set higher.

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/double-set-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/double-set-dark.png'),
  }}>
</ThemedImage>
