# springbokjs-router [![NPM version][npm-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage][coverage-image]][coverage-url]

[![browser support](https://ci.testling.com/christophehurpeau/springbokjs-router.png)
](https://ci.testling.com/christophehurpeau/springbokjs-router)

See the [auto-generated docs](http://christophehurpeau.github.io/springbokjs-router/docs/)

### How to use


```js
var SpringbokRouter = require('springbokjs-router');

var RouterBuilder = SpringbokRouter.RouterBuilder;
var RoutesTranslations = SpringbokRouter.RoutesTranslations;

var routesLangs = {
    login: {
        en: 'login',
        fr: 'connexion'
    },
    post: {
        en: 'post',
        fr: 'article'
    },
    'view': {
        en: 'view',
        fr: 'afficher'
    }
};
var routesTranslations = new RoutesTranslations(routesLangs);

var builder = new RouterBuilder(routesTranslations, ['en', 'fr']);
module.exports = builder.router;

builder
    .add('/', '/', 'site.index')
    .add('postView', '/post/:id-:slug', 'post.view', {
        namedParamsDefinition: {'slug': '[A-Za-z\-]+'},
        extension: 'htm'
    })
    .addDefaultRoutes();


```


Missing before 1.0.0:

- better handle of array to route : RouterRouteLang.strf is not ideal. Especially with routes like '.../*' or route with optional parts

[npm-image]: https://img.shields.io/npm/v/springbokjs-router.svg?style=flat
[npm-url]: https://npmjs.org/package/springbokjs-router
[build-status-image]: https://drone.io/github.com/christophehurpeau/springbokjs-router/status.png
[build-status-url]: https://drone.io/github.com/christophehurpeau/springbokjs-router/latest
[coverage-image]: http://img.shields.io/badge/coverage-85%-green.svg?style=flat
[coverage-url]: http://christophehurpeau.github.io/springbokjs-router/docs/coverage.html
