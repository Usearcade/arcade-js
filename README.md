<h1 align="center">@usearcade/arcade-js</h1>
<p>
  <a href="https://www.npmjs.com/package/@usearcade/arcade-js" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@usearcade/arcade-js.svg">
  </a>
  <a href="https://github.com/Usearcade/arcade-js#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Usearcade/arcade-js/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Usearcade/arcade-js/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/Usearcade/@usearcade/arcade-js" />
  </a>
  <a href="https://twitter.com/usearcade" target="_blank">
    <img alt="Twitter: usearcade" src="https://img.shields.io/twitter/follow/usearcade.svg?style=social" />
  </a>
</p>

> Make Arcade a dependency in your project and access your design tokens with ease

### 🏠 [Homepage](https://github.com/Usearcade/arcade-js#readme)

## Install

```sh
npm install @usearcade/arcade-js
```

## Usage

When this package is installed, `arcade-config.json` will be added to the root of your repository. Within this file, make sure to add your `project_id`, `access_token`, and `version` to ensure the install will work. These details can be found within your Arcade project.

The install will add two scripts to your `package.json`:

### Build Tokens
```sh
  npm run arcade-build
```
This command will fetch your tokens from Arcade and build them locally using the configuration in `arcade-config.json`.

### Update Tokens
```sh
  npm run arcade-update
```
This command will fetch the latest published tokens from Arcade and build them locally using the configuration in `arcade-config.json`. The version number in `arcade-config.json` **does not** have to be manually changed and will be updated automatically.


## Author

👤 **Arcade Inc.**

* Website: https://usearcade.com
* Twitter: [@usearcade](https://twitter.com/usearcade)
* Github: [@Usearcade](https://github.com/Usearcade)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Usearcade/arcade-js/issues). 


## 📝 License

Copyright © 2021 [Arcade Inc.](https://github.com/Usearcade).<br />
This project is [GPL-3.0](https://opensource.org/licenses/GPL-3.0) licensed.
