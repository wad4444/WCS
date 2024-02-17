---
sidebar_position: 2
---

# Humanoid Data

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

И так, давайте добавим новый *сайд-эффект* к нашему *статусу*. Пока *стан* активен на нашем *персонаже*, нам нужно
устанавливать `WalkSpeed` и `JumpPower` на *ноль*.
**WCS** предоставляет специальный "инструмент" для управления *статами хуманоида*.

## Что такое Humanoid Data?
`Humanoid Data` в **WCS** это `Словарь`, где:
 - `Ключ` это имя одного из доступных `свойств` хуманоида:
   - WalkSpeed, JumpPower, JumpHeight, AutoRotate
 - `Значение` это список, где:
   - Первый элемент это значение *property*.
   - Второй элемент это `Mode` (режим), с которыми *property* будет наложен.
 - `Priority` это значение, которое вы можете указать при создании `Humanoid Data`. Оно используется для разрешения конфликтов между разными статусами.

:::note
  Если при установки `Humanoid Data` вы не зададите приоритет, то он будет равен  единице.
:::

## Что такое Mode?
`Mode` - это режим применения свойств хуманоида.
В **WCS** существует только 2 различных режима применения *свойств*: `Increment` и `Set`.

### Increment

К примеру, у нас есть *статус эффект*, который *замедляет* нас на 5 единиц `WalkSpeed`.
Его `Humanoid Data` будет выглядить следующим образом:
```lua
{ WalkSpeed = {-5, "Increment"} }
```
Если режим установлен на `Increment`, то значение свойства будет сумированно с другими источниками даты:
Тоесть, если у нас есть два эффекта замедленния, то их значения будут просумированны.

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/slowness10-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/slowness10-dark.png'),
  }}>
</ThemedImage>

### Set

`Set` строго устанавливает *свойство* на **одно** значение, игнорируя *суммирование*.
```lua
{ WalkSpeed = {-5, "Set"} }
```
Если режим установлен на `Set`, значение поля будет установлено на `-5`, и не будет подвержено суммированию:
То-есть, если у нас есть *эффект замедления* и эффект, который *строго устанавливает* значение `WalkSpeed`, то
замедление будет *проигнорировано*.

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/slowness-set-0-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/slowness-set-0-dark.png'),
  }}>
</ThemedImage>
**Однако**, если к персонажу будут применены 2 *разных* статус эффекта, которые устанавливают *разные значения для одного свойства*, то **WCS** отдаст приоритет тому, у которого свойство `Priority` будет выше.

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/double-set-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/double-set-dark.png'),
  }}>
</ThemedImage>
