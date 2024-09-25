---
sidebar_position: 2
---

# Installation  

You can currently install **WCS** to your *project* with *3 different methods*:

### NPM Installation

Intended only for *[TypeScript](https://typescriptlang.org/)* users:
Install **WCS** by running *the following command* in your *terminal*:

```bash
npm i @rbxts/wcs@latest
```

WCS depends on packages from `@flamework` npm org. You'll need to add it to your Rojo Project File.
```json
"@flamework": {
	"$path": "node_modules/@flamework"
}
```

### Wally Installation

Install **WCS** using a popular package manager called **[Wally](https://wally.run/)**. Put the following line
under `[dependencies]` in your `wally.toml` file.
*Consider using the latest version*:

```md title="wally.toml"
[dependencies]
wcs = "cheetiedotpy/wcs@2.4.0"
```

### Roblox Studio Installation

If you are not using **[Rojo](https://rojo.space/)**, navigate yourself to *[github releases](https://github.com/g1mmethemoney/WCSTypescript/releases/)*
page and download *rbxm* file of *the latest* version:

<img
  src={require('@site/static/img/rbxm-file.png').default}
  alt="Example banner"
/>

And put it under `Replicated Storage`:

<img
  src={require('@site/static/img/replicatedstorage.png').default}
  alt="Example banner"
/>
