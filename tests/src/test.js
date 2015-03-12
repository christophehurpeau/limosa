/* global test */
require('es6-shim/es6-shim');
var libcov = '../../lib-cov/';
import RouterBuilder from '../../lib/RouterBuilder';
if (process.env.TEST_COV) {
    RouterBuilder = require(libcov + 'RouterBuilder');
}

import RouteTranslations from '../../lib/RoutesTranslations';
if (process.env.TEST_COV) {
    RouteTranslations = require(libcov + 'RoutesTranslations');
}

var assert = require('proclaim');
//var fs = require('springbokjs-utils/fs');

//var routesLangsConfig = fs.readYamlFileSync('example/routesLangs.yml');
var routesLangsConfig = {
    login: {
        en: 'login',
        fr: 'connexion',
    },
    post: {
        en: 'post',
        fr: 'article',
    },
    view: {
        en: 'view',
        fr: 'afficher'
    }
};

var routesTranslations = new RouteTranslations(routesLangsConfig);

test('RouteTranslations', function() {
    assert.strictEqual(routesTranslations.translate('login', 'fr'), 'connexion');
    assert.strictEqual(routesTranslations.untranslate('connexion', 'fr'), 'login');
});

var builder = new RouterBuilder(routesTranslations, ['en', 'fr']);
var router = builder.router;

builder
    .add('/', '/', 'site.index')
    .add('postView', '/post/:id-:slug', 'post.view', {
        namedParamsDefinition: {'slug': '[A-Za-z\\-]+'},
        extension: 'htm'
    })
    .add('postView2', '/post/:id-:slug', 'post.view', {
        namedParamsDefinition: {'slug': /[A-Za-z\-]+/},
        extension: 'htm'
    })
    .add('postWithDate', '/post(/:tagKey)?(/:date_:slug)', 'post.view', {
        namedParamsDefinition: {date: '\\d{4}\\-\\d{2}\\-\\d{2}'}
    })
    .addDefaultRoutes();


test('SimpleRoute', function() {
    var rr = router.get('/');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'site');
    assert.strictEqual(rr.action, 'index');
    assert.strictEqual(rr.getNamedParamsCount(), 0);
    var en = rr.get('en');
    assert.strictEqual(en.regExp.source, '^\\/$');
    assert.strictEqual(en.strf,'/');
    var fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, '^\\/$');
    assert.strictEqual(fr.strf,'/');
});

test('Common route', function() {
    var rrs = router.get('defaultSimple');
    assert.ok(rrs != null);
    assert.strictEqual(rrs.controller, 'site');
    assert.strictEqual(rrs.action, 'index');
    assert.strictEqual(rrs.getNamedParamsCount(), 0);
    var rsen = rrs.get('en');
    assert.strictEqual(rsen.regExp.source, '^(?:\\.(html))?$');
    assert.strictEqual(rsen.strf,'/%s');
    var rsfr = rrs.get('fr');
    assert.strictEqual(rsfr.regExp.source, '^(?:\\.(html))?$');
    assert.strictEqual(rsfr.strf,'/%s');

    var rr = router.get('default');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'site');
    assert.strictEqual(rr.action, 'index');
    assert.deepEqual(rr.namedParams, ['action']);
    assert.strictEqual(rr.getNamedParamsCount(), 1);
    var en = rr.get('en');

    assert.strictEqual(en.regExp.source, /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source);
    assert.strictEqual(en.strf,'/%s/%s%s');
    var fr = rr.get('fr');
    assert.strictEqual(en.regExp.source, /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source);
    assert.strictEqual(fr.strf,'/%s/%s%s');
});

test('Named param route', function() {
    var rr = router.get('postView');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'post');
    assert.strictEqual(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['id', 'slug']);
    assert.strictEqual(rr.getNamedParamsCount(), 2);
    var en = rr.get('en');
    assert.strictEqual(en.regExp.source, /^\/post\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(en.strf,'/post/%s-%s');
    var fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, /^\/article\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(fr.strf,'/article/%s-%s');
});

test('Named param route with RegExp', function() {
    var rr = router.get('postView2');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'post');
    assert.strictEqual(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['id', 'slug']);
    assert.strictEqual(rr.getNamedParamsCount(), 2);
    var en = rr.get('en');
    assert.strictEqual(en.regExp.source, /^\/post\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(en.strf,'/post/%s-%s');
    var fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, /^\/article\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(fr.strf,'/article/%s-%s');
});

test('More complex param route', function() {
    var rr = router.get('postWithDate');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'post');
    assert.strictEqual(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['tagKey', 'date', 'slug']);
    assert.strictEqual(rr.getNamedParamsCount(), 3);
    var en = rr.get('en');
    assert.strictEqual(en.regExp.source, /^\/post(?:\/([^\/.]+))?(?:\/(\d{4}\-\d{2}\-\d{2})_([^\/.]+))$/.source);
    assert.strictEqual(en.strf,'/post/%s/%s%s');
    var fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, /^\/article(?:\/([^\/.]+))?(?:\/(\d{4}\-\d{2}\-\d{2})_([^\/.]+))$/.source);
    assert.strictEqual(fr.strf,'/article/%s/%s%s');
});


test('Find simple routes', function() {
    var r = router.find('/', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/');
    assert.strictEqual(r.controller, 'site');
    assert.strictEqual(r.action, 'index');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.strictEqual(r.otherParams, undefined);

    r = router.find('/', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/');
    assert.strictEqual(r.controller, 'site');
    assert.strictEqual(r.action, 'index');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.strictEqual(r.otherParams, undefined);
});

test('Find common routes, /:controller', function() {
    var r = router.find('/post', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'index');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.strictEqual(r.otherParams, undefined);

    r = router.find('/post.html', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post.html');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.extension, 'html');
    assert.strictEqual(r.namedParams, undefined);

    r = router.find('/article', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/article');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'index');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.strictEqual(r.otherParams, undefined);

    r = router.find('/article.html', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/article.html');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.extension, 'html');
    assert.strictEqual(r.namedParams, undefined);
});

test('Find common routes, /:controller/:action', function() {
    var r = router.find('/post/view', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post/view');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.strictEqual(r.otherParams, undefined);

    r = router.find('/post/view.html', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post/view.html');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, 'html');
    assert.strictEqual(r.namedParams, undefined);

    r = router.find('/article/afficher', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/article/afficher');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.strictEqual(r.otherParams, undefined);

    r = router.find('/article/afficher.html', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/article/afficher.html');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, 'html');
    assert.strictEqual(r.namedParams, undefined);
});


  test('Find common routes, /:controller/:action/*', function() {
    var r = router.find('/post/view/test1/test2', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post/view/test1/test2');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);

    r = router.find('/post/view/test1/test2.html', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post/view/test1/test2.html');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.extension, 'html');
    assert.strictEqual(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);

    r = router.find('/article/afficher/test1/test2', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/article/afficher/test1/test2');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, undefined);
    assert.strictEqual(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);

    r = router.find('/article/afficher/test1/test2.html', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/article/afficher/test1/test2.html');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, 'html');
    assert.strictEqual(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);
});


  test('Find named param route', function() {
    var r = router.find('/post/001-The-First-Post.htm', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post/001-The-First-Post.htm');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, 'htm');
    var namedParams = r.namedParams;
    assert.isInstanceOf(namedParams, Map);
    assert.strictEqual(r.namedParams.size, 2);
    assert.strictEqual(r.namedParams.get('id'), '001');
    assert.strictEqual(r.namedParams.get('slug'), 'The-First-Post');
    assert.strictEqual(r.otherParams, undefined);

    r = router.find('/article/001-Le-Premier-Billet.htm', 'fr');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/article/001-Le-Premier-Billet.htm');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, 'htm');
    namedParams = r.namedParams;
    assert.isInstanceOf(namedParams, Map);
    assert.strictEqual(r.namedParams.size, 2);
    assert.strictEqual(r.namedParams.get('id'), '001');
    assert.strictEqual(r.namedParams.get('slug'), 'Le-Premier-Billet');
    assert.strictEqual(r.otherParams, undefined);
});
