# Template for portals
​
### Change these values first

* `%HOST%` // the actual site's host
* `%HOST_PRISMIC%` // Prismic CDN host (required)
* `%STAGING_CLOUDFRONTID%`
* `%PROD_CLOUDFRONTID%`

### Kubernets

* name: `%HOST%`
* namespance: portal-base
* secret name: `%HOST%-env`

# `%HOST%`

This project is the Escale's [`%HOST%`](`%HOST%`)

## Quick Start

```bash
yarn install
yarn start
```

Then open <http://localhost:3000/> to see your app.

Below is a list of commands you will probably find useful.

### For production mode

```bash
yarn build
yarn start:prod
```

### Running the tests

```bash
yarn test
yarn test:watch
```

### Running lint

* [Standardjs](https://standardjs.com/) - JavaScript style guide, linter, and formatter
* [Stylelint](https://stylelint.io/) - A mighty, modern style linter

```bash
yarn lint
yarn stylelint
```

## Deployment

* `master` -> automatically deploys to Staging

Any other branch is only built for CI.

## CMS

Prismic: Prismic is a Content Management System, that enable us to choose our technology (http://prismic.io/).

[Prismic Contrate Aqui](https://%HOST%.prismic.io/documents/working/)

### Prismic API

[src/services/prismic/api.js](https://github.com/escaletech/contrateaqui/blob/master/src/services/prismic/api.js)
This file contains all types of query we use to retrieve content from prismic API.

## Built With​

* [Razzle](https://github.com/jaredpalmer/razzle) - Create server-rendered universal JavaScript applications
* [React](https://reactjs.org/) -  A JavaScript library for building user interfaces
* [Express](https://expressjs.com/) - Node.js web application framework
