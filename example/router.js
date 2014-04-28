var RouterBuilder = require('../lib/builder');
var RoutesTranslations = require('../lib/routes_translations');

var fs = require('springbokjs-utils/fs');
var routesLangsConfig = fs.readYamlFileSync(__dirname + '/routesLangs.yml');
var routesTranslations = new RoutesTranslations(routesLangsConfig);

var builder = new RouterBuilder(routesTranslations, ['en', 'fr']);
module.exports = builder.router;

builder
    .add('/', '/', 'Site.index')
    .add('postView', '/post/:id-:slug', 'Post.view', {
        namedParamsDefinition: {'slug': '[A-Za-z\-]+'},
        extension: 'htm'
    })
    .addDefaultRoutes();
