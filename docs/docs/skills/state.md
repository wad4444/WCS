---
sidebar_position: 9
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Ability State

Ability State is an object represents current state of an ability and can be obtained with `GetState()` method or inside `StateChanged` event.
It can be useful to *display some information* about your ability, e.g, whenever its currently *active or on debounce*.

:::note
`StateChanged` is deferred and safe to use in react components.
:::

The `State Object` itself looks like this:
 - IsActive: `boolean` - Determines if an ability is currently *active* or not
 - Debounce: `boolean` - Determines if an ability is currently *on cooldown* or not

### What abilities **WCS** considers "Active"?

All abilities that have `OnStartServer()` method *currently executing* are considered **active**.
:::note
It is a **good practice** to yield your code inside `OnStartServer()`
:::

Here is an *execution schema* of how it works *internally*:

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/execution-schema-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/execution-schema-dark.png'),
  }}>
</ThemedImage>