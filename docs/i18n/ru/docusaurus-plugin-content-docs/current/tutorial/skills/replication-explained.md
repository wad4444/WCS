---
sidebar_position: 4
---

# Принцип работы репликации

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

Перед тем, как мы *начнем запускать способности* довольно важно знать то, как **WCS** реплецирует наши способности.
Каждое действие, которое мы производим, *запускается на сервере*, и позже *реплицируется* на клиент. Вот простенькая
*блок схема*, которая наглядно *показывает* как происходит репликация:

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/replication-block-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/replication-block-dark.png'),
  }}>
</ThemedImage>

## Запросы

Если клиент выполняет *действие*, например методы `Start` или `End`, запрос на выполнение сначала *отправляется на сервер*:

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('/img/themed-block-schemes/skill-start-block-white.png'),
    dark: useBaseUrl('/img/themed-block-schemes/skill-start-block-dark.png'),
  }}>
</ThemedImage>