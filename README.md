[![Build Status](https://drone.io/github.com/christophehurpeau/springbokjs-router/status.png)](https://drone.io/github.com/christophehurpeau/springbokjs-router/latest)

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
    .add('/', '/', 'Site.index')
    .add('postView', '/post/:id-:slug', 'Post.view', {
        namedParamsDefinition: {'slug': '[A-Za-z\-]+'},
        extension: 'htm'
    })
    .addDefaultRoutes();


```
