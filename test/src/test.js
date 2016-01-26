/* global test */
import RouterBuilder from '../../lib/RouterBuilder';
import RouteTranslations from '../../lib/RoutesTranslations';

import assert from 'proclaim';

// const routesLangsConfig = fs.readYamlFileSync('example/routesLangs.yml');
const routesLangsConfig = new Map([
    ['login', new Map([['en', 'login'], ['fr', 'connexion']])],
    ['post', new Map([['en', 'post'], ['fr', 'article']])],
    ['view', new Map([['en', 'view'], ['fr', 'afficher']])],
]);

const routesTranslations = new RouteTranslations(routesLangsConfig);

test('RouteTranslations', () => {
    assert.strictEqual(routesTranslations.translate('login', 'fr'), 'connexion');
    assert.strictEqual(routesTranslations.untranslate('connexion', 'fr'), 'login');
});

const builder = new RouterBuilder(routesTranslations, ['en', 'fr']);
const router = builder.router;

builder
    .add('/', '/', 'site.index')
    .add('postView', '/post/${id}-${slug}', 'post.view', {
        namedParamsDefinition: { slug: '[A-Za-z\\-]+' },
        extension: 'htm',
    })
    .add('postView2', '/post/${id}-${slug}', 'post.view', {
        namedParamsDefinition: { slug: /[A-Za-z\-]+/ },
        extension: 'htm',
    })
    .add('postWithDate', '/post[/${tagKey}]/${date}_${slug}', 'post.view', {
        namedParamsDefinition: { date: '\\d{4}\\-\\d{2}\\-\\d{2}' },
    })
    .addDefaultRoutes();

test('SimpleRoute', () => {
    let rr = router.get('/');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'site');
    assert.strictEqual(rr.action, 'index');
    assert.strictEqual(rr.getNamedParamsCount(), 0);
    let en = rr.get('en');
    assert.strictEqual(en.regExp.source, '^\\/$');
    assert.strictEqual(en.url(), '/');
    let fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, '^\\/$');
    assert.strictEqual(fr.url(), '/');
});

test('Common route', () => {
    let rrs = router.get('defaultSimple');
    assert.ok(rrs != null);
    assert.strictEqual(rrs.controller, 'site');
    assert.strictEqual(rrs.action, 'index');
    assert.strictEqual(rrs.getNamedParamsCount(), 0);
    let rsen = rrs.get('en');
    assert.strictEqual(rsen.regExp.source, '^(?:\\.(html))?$');
    assert.strictEqual(rsen.url({ controller: 'post' }), '/post.html');
    let rsfr = rrs.get('fr');
    assert.strictEqual(rsfr.regExp.source, '^(?:\\.(html))?$');
    assert.strictEqual(rsfr.url({ controller: 'post' }), '/article.html');

    let rr = router.get('default');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'site');
    assert.strictEqual(rr.action, 'index');
    assert.deepEqual(rr.namedParams, ['action']);
    assert.strictEqual(rr.getNamedParamsCount(), 1);
    let en = rr.get('en');

    assert.strictEqual(en.regExp.source, /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source);
    assert.strictEqual(en.url({ controller: 'post', action: 'view' }), '/post/view.html');
    let fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source);
    assert.strictEqual(fr.url({ controller: 'post', action: 'view' }), '/article/afficher.html');
});

test('Named param route', () => {
    let rr = router.get('postView');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'post');
    assert.strictEqual(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['id', 'slug']);
    assert.strictEqual(rr.getNamedParamsCount(), 2);
    let en = rr.get('en');
    assert.strictEqual(en.regExp.source, /^\/post\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(en.url({ id: 1, slug: 'a-slug' }), '/post/1-a-slug.htm');
    let fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, /^\/article\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(fr.url({ id: 1, slug: 'un-slug' }), '/article/1-un-slug.htm');
});

test('Named param route with RegExp', () => {
    let rr = router.get('postView2');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'post');
    assert.strictEqual(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['id', 'slug']);
    assert.strictEqual(rr.getNamedParamsCount(), 2);
    let en = rr.get('en');
    assert.strictEqual(en.regExp.source, /^\/post\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(en.url({ id: 1, slug: 'a-slug' }), '/post/1-a-slug.htm');
    let fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, /^\/article\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    assert.strictEqual(fr.url({ id: 1, slug: 'un-slug' }), '/article/1-un-slug.htm');
});

test('More complex param route', () => {
    let rr = router.get('postWithDate');
    assert.ok(rr != null);
    assert.strictEqual(rr.controller, 'post');
    assert.strictEqual(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['tagKey', 'date', 'slug']);
    assert.strictEqual(rr.getNamedParamsCount(), 3);
    let en = rr.get('en');
    assert.strictEqual(en.regExp.source, /^\/post(?:\/([^\/.]+))\/(\d{4}\-\d{2}\-\d{2})_([^\/.]+)$/.source);
    assert.strictEqual(en.url({ date: '2015-01-01', slug: 'a-slug' }), '/post/2015-01-01_a-slug');
    let fr = rr.get('fr');
    assert.strictEqual(fr.regExp.source, /^\/article(?:\/([^\/.]+))\/(\d{4}\-\d{2}\-\d{2})_([^\/.]+)$/.source);
    assert.strictEqual(fr.url({ date: '2015-01-01', slug: 'un-slug' }), '/article/2015-01-01_un-slug');
});

test('Find simple routes', () => {
    let r = router.find('/', 'en');
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

test('Find common routes, /:controller', () => {
    let r = router.find('/post', 'en');
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

test('Find common routes, /:controller/:action', () => {
    let r = router.find('/post/view', 'en');
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

test('Find common routes, /:controller/:action/*', () => {
    let r = router.find('/post/view/test1/test2', 'en');
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

test('Find named param route', () => {
    let r = router.find('/post/001-The-First-Post.htm', 'en');
    assert.ok(r != null);
    assert.strictEqual(r.all, '/post/001-The-First-Post.htm');
    assert.strictEqual(r.controller, 'post');
    assert.strictEqual(r.action, 'view');
    assert.strictEqual(r.extension, 'htm');
    let namedParams = r.namedParams;
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

test('Router generator default', () => {
    let url = router.urlGenerator('en', 'default', { controller: 'post', action: 'view' });
    assert.strictEqual(url, '/post/view.html');
});

test('Router generator postView', () => {
    let url = router.urlGenerator('en', 'postView', { id: '001', slug: 'Le-Premier-Billet' });
    assert.strictEqual(url, '/post/001-Le-Premier-Billet.htm');

    url = router.urlGenerator('fr', 'postView', { id: '001', slug: 'Le-Premier-Billet' });
    assert.strictEqual(url, '/article/001-Le-Premier-Billet.htm');
});
