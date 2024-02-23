---
sidebar_position: 2
---

# Установка  

Вы можете установить **WCS** в ваш *проект* *тремя разными методами*:

### С помощью NPM

Предназначена только для пользователей *[Тайпскрипта](https://typescriptlang.org/)*:
Установи **WCS** прописав *данную команду* в *консоль*:

```bash
npm i @rbxts/wcs@latest
```

### С помощью Wally

Установи **WCS** с помощью популярного пакет-менеджера **[Wally](https://wally.run/)**. Помести данную линию
под графу `[dependencies]` в файле `wally.toml`.
*Желательно использовать последнюю версию*:

```md title="wally.toml"
[dependencies]
wcs = "cheetiedotpy/wcs@0.7.2"
```

### Скачать файл

Если вы не используете **[Rojo](https://rojo.space/)**, то просто зайдите на *[страничку с релизами фреймворка](https://github.com/g1mmethemoney/WCSTypescript/releases/)*
и скачайте *rbxm* файл *последней* версии:

<img
  src={require('@site/static/img/rbxm-file.png').default}
  alt="Example banner"
/>

Поместите модуль в `Replicated Storage`:

<img
  src={require('@site/static/img/replicatedstorage.png').default}
  alt="Example banner"
/>
