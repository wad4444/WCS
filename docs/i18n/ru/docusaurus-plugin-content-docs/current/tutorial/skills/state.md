---
sidebar_position: 9
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# "Состояние" способности

Состояние способности это объект, который отражает состояние способности в данный момент. Вы можете получить
его с помощью метода `GetState()` или эвента `StateChanged`.
Он может быть использован для *вывода какой-то информации* о способности, к примеру, активна ли она в данный момент или в откате.

:::note
`StateChanged` при частом изменении вызывается только с последним изменением за фрейм
и может быть безопасно использован в реакт-компонентах.
:::

Сам `объект состояния` выглядит так:
 - IsActive: `boolean` - Определяет *активна* ли способность *в данный момент*.
 - Debounce: `boolean` - Определяет *в откате* ли способность *в данный момент*.

### Какие способности **WCS** считает "активными"?

Все способности, у которых метод `OnStartServer()` в данный момент *выполняется* считаются активными.
:::note
Синхронно выполнять свой код в `OnStartServer()` - **хорошая практика**.
:::

Вот *небольшая схемка*, которая показывает то, как это работает *внутри фреймворка*:

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/execution-schema-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/execution-schema-dark.png'),
  }}>
</ThemedImage>