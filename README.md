# limosa [![NPM version][npm-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage][coverage-image]][coverage-url]

See the [auto-generated docs](http://christophehurpeau.github.io/limosa/docs/)

### How to use


```js
import { RouterBuilder, RoutesTranslations } from 'limosa';


const routesLangsConfig = new Map([
    ['login', new Map([['en', 'login'], ['fr', 'connexion']])],
    ['post', new Map([['en', 'post'], ['fr', 'article']])],
    ['view', new Map([['en', 'view'], ['fr', 'afficher']])],
]);

const routesTranslations = new RoutesTranslations(routesLangsConfig);

const builder = new RouterBuilder(routesTranslations, ['en', 'fr']);
module.exports = builder.router;

builder
    .add('/', '/', 'site.index')
    .add('postView', '/post/${id}-${slug}', 'post.view', {
        namedParamsDefinition: { slug: '[A-Za-z\-]+' },
        extension: 'htm'
    })
    .addDefaultRoutes();

```

### Build a router

- Named parameter: `${name}`
- Optional route part: `[]` like `'/post[/${tagKey}]/${id}-${slug}'`
- Special named parameters: `controller`, `action`, `queryString`, `hash`.

### Url Generator

```js
router.urlGenerator('en', 'postView', { id: '001', 'a-slug' });
// /post/001-a-slug

```


[npm-image]: https://img.shields.io/npm/v/limosa.svg?style=flat-square
[npm-url]: https://npmjs.org/package/limosa
[build-status-image]: https://img.shields.io/circleci/project/christophehurpeau/limosa/master.svg?style=flat-square
[build-status-url]: https://circleci.com/gh/christophehurpeau/limosa
[coverage-image]: http://img.shields.io/badge/coverage-90%-green.svg?style=flat
[coverage-url]: http://christophehurpeau.github.io/limosa/coverage/lcov-report/
