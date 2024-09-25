---
sidebar_position: 7
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import TOCInline from "@theme/TOCInline";

# Moveset

[Character]: ../api/character.md

<TOCInline toc={toc} />

## Fields

### `Name` **@readonly**
A string value.

### `ConstructorParams`
Constructor parameters passed to `CreateMoveset()`.

### `Skills`
`Constructor<AnySkill>[]`. Skill Constructors passed to `CreateMoveset()`.

## Events

### `OnCharacterAdded`
Fires whenever the moveset gets applied to a [Character].

**`Parameters:`**
* Character: `Character`

### `OnCharacterRemoved`
Fires whenever the moveset gets removed from a [Character].

**`Parameters:`**
* Character: `Character`