'use strict';

var _RouterBuilder = require('../../lib/RouterBuilder/RouterBuilder');

var _RouterBuilder2 = _interopRequireDefault(_RouterBuilder);

var _RoutesTranslations = require('../../lib/RoutesTranslations');

var _RoutesTranslations2 = _interopRequireDefault(_RoutesTranslations);

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const routesLangsConfig = fs.readYamlFileSync('example/routesLangs.yml');
const routesLangsConfig = new Map([['login', new Map([['en', 'login'], ['fr', 'connexion']])], ['post', new Map([['en', 'post'], ['fr', 'article']])], ['view', new Map([['en', 'view'], ['fr', 'afficher']])]]); /* global test */


const routesTranslations = new _RoutesTranslations2.default(routesLangsConfig);

test('RouteTranslations', () => {
    _proclaim2.default.strictEqual(routesTranslations.translate('login', 'fr'), 'connexion');
    _proclaim2.default.strictEqual(routesTranslations.untranslate('connexion', 'fr'), 'login');
});

const builder = new _RouterBuilder2.default(routesTranslations, ['en', 'fr']);
const router = builder.router;

builder.add('/', '/', 'site.index').add('postView', '/post/${id}-${slug}', 'post.view', {
    namedParamsDefinition: { slug: '[A-Za-z\\-]+' },
    extension: 'htm'
}).add('postView2', '/post/${id}-${slug}', 'post.view', {
    namedParamsDefinition: { slug: /[A-Za-z\-]+/ },
    extension: 'htm'
}).add('postWithDate', '/post[/${tagKey}]/${date}_${slug}', 'post.view', {
    namedParamsDefinition: { date: '\\d{4}\\-\\d{2}\\-\\d{2}' }
}).addDefaultRoutes();

test('Named param route', () => {
    let rr = router.get('postView');
    _proclaim2.default.ok(rr != null);
    _proclaim2.default.strictEqual(rr.controller, 'post');
    _proclaim2.default.strictEqual(rr.action, 'view');
    _proclaim2.default.deepEqual(rr.namedParams, ['id', 'slug']);
    _proclaim2.default.strictEqual(rr.getNamedParamsCount(), 2);
    let en = rr.get('en');
    _proclaim2.default.strictEqual(en.regExp.source, /^\/post\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    _proclaim2.default.strictEqual(en.url({ id: 1, slug: 'a-slug' }), '/post/1-a-slug.htm');
    let fr = rr.get('fr');
    _proclaim2.default.strictEqual(fr.regExp.source, /^\/article\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    _proclaim2.default.strictEqual(fr.url({ id: 1, slug: 'un-slug' }), '/article/1-un-slug.htm');
});

test('Named param route with RegExp', () => {
    let rr = router.get('postView2');
    _proclaim2.default.ok(rr != null);
    _proclaim2.default.strictEqual(rr.controller, 'post');
    _proclaim2.default.strictEqual(rr.action, 'view');
    _proclaim2.default.deepEqual(rr.namedParams, ['id', 'slug']);
    _proclaim2.default.strictEqual(rr.getNamedParamsCount(), 2);
    let en = rr.get('en');
    _proclaim2.default.strictEqual(en.regExp.source, /^\/post\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    _proclaim2.default.strictEqual(en.url({ id: 1, slug: 'a-slug' }), '/post/1-a-slug.htm');
    let fr = rr.get('fr');
    _proclaim2.default.strictEqual(fr.regExp.source, /^\/article\/([0-9]+)\-([A-Za-z\-]+)\.(htm)$/.source);
    _proclaim2.default.strictEqual(fr.url({ id: 1, slug: 'un-slug' }), '/article/1-un-slug.htm');
});

test('More complex param route', () => {
    let rr = router.get('postWithDate');
    _proclaim2.default.ok(rr != null);
    _proclaim2.default.strictEqual(rr.controller, 'post');
    _proclaim2.default.strictEqual(rr.action, 'view');
    _proclaim2.default.deepEqual(rr.namedParams, ['tagKey', 'date', 'slug']);
    _proclaim2.default.strictEqual(rr.getNamedParamsCount(), 3);
    let en = rr.get('en');
    _proclaim2.default.strictEqual(en.regExp.source, /^\/post(?:\/([^\/.]+))?\/(\d{4}\-\d{2}\-\d{2})_([^\/.]+)$/.source);
    _proclaim2.default.strictEqual(en.url({ date: '2015-01-01', slug: 'a-slug' }), '/post/2015-01-01_a-slug');
    _proclaim2.default.strictEqual(en.url({ date: '2015-01-01', slug: 'a-slug', tagKey: 'some-tag' }), '/post/some-tag/2015-01-01_a-slug');

    let fr = rr.get('fr');
    _proclaim2.default.strictEqual(fr.regExp.source, /^\/article(?:\/([^\/.]+))?\/(\d{4}\-\d{2}\-\d{2})_([^\/.]+)$/.source);
    _proclaim2.default.strictEqual(fr.url({ date: '2015-01-01', slug: 'un-slug' }), '/article/2015-01-01_un-slug');
});

test('Find simple routes', () => {
    let r = router.find('/', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/');
    _proclaim2.default.strictEqual(r.controller, 'site');
    _proclaim2.default.strictEqual(r.action, 'index');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.strictEqual(r.otherParams, undefined);

    r = router.find('/', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/');
    _proclaim2.default.strictEqual(r.controller, 'site');
    _proclaim2.default.strictEqual(r.action, 'index');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.strictEqual(r.otherParams, undefined);
});

test('Find common routes, /:controller', () => {
    let r = router.find('/post', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'index');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.strictEqual(r.otherParams, undefined);

    r = router.find('/post.html', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post.html');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.extension, 'html');
    _proclaim2.default.strictEqual(r.namedParams, undefined);

    r = router.find('/article', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/article');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'index');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.strictEqual(r.otherParams, undefined);

    r = router.find('/article.html', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/article.html');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.extension, 'html');
    _proclaim2.default.strictEqual(r.namedParams, undefined);
});

test('Find common routes, /:controller/:action', () => {
    let r = router.find('/post/view', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post/view');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.strictEqual(r.otherParams, undefined);

    r = router.find('/post/view.html', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post/view.html');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, 'html');
    _proclaim2.default.strictEqual(r.namedParams, undefined);

    r = router.find('/article/afficher', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/article/afficher');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.strictEqual(r.otherParams, undefined);

    r = router.find('/article/afficher.html', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/article/afficher.html');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, 'html');
    _proclaim2.default.strictEqual(r.namedParams, undefined);
});

test('Find common routes, /:controller/:action/*', () => {
    let r = router.find('/post/view/test1/test2', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post/view/test1/test2');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.deepEqual(r.otherParams, ['test1', 'test2']);

    r = router.find('/post/view/test1/test2.html', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post/view/test1/test2.html');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.extension, 'html');
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.deepEqual(r.otherParams, ['test1', 'test2']);

    r = router.find('/article/afficher/test1/test2', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/article/afficher/test1/test2');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, undefined);
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.deepEqual(r.otherParams, ['test1', 'test2']);

    r = router.find('/article/afficher/test1/test2.html', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/article/afficher/test1/test2.html');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, 'html');
    _proclaim2.default.strictEqual(r.namedParams, undefined);
    _proclaim2.default.deepEqual(r.otherParams, ['test1', 'test2']);
});

test('Find named param route', () => {
    let r = router.find('/post/001-The-First-Post.htm', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post/001-The-First-Post.htm');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, 'htm');
    let namedParams = r.namedParams;
    _proclaim2.default.isInstanceOf(namedParams, Map);
    _proclaim2.default.strictEqual(r.namedParams.size, 2);
    _proclaim2.default.strictEqual(r.namedParams.get('id'), '001');
    _proclaim2.default.strictEqual(r.namedParams.get('slug'), 'The-First-Post');
    _proclaim2.default.strictEqual(r.otherParams, undefined);

    r = router.find('/article/001-Le-Premier-Billet.htm', 'fr');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/article/001-Le-Premier-Billet.htm');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.extension, 'htm');
    namedParams = r.namedParams;
    _proclaim2.default.isInstanceOf(namedParams, Map);
    _proclaim2.default.strictEqual(r.namedParams.size, 2);
    _proclaim2.default.strictEqual(r.namedParams.get('id'), '001');
    _proclaim2.default.strictEqual(r.namedParams.get('slug'), 'Le-Premier-Billet');
    _proclaim2.default.strictEqual(r.otherParams, undefined);
});

test('Find postWithDate without tag', () => {
    let r = router.find('/post/2015-01-01_a-slug', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post/2015-01-01_a-slug');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.namedParams.size, 2);
    _proclaim2.default.strictEqual(r.namedParams.get('date'), '2015-01-01');
    _proclaim2.default.strictEqual(r.namedParams.get('slug'), 'a-slug');
});

test('Find postWithDate with tag', () => {
    let r = router.find('/post/some-tag/2015-01-01_a-slug', 'en');
    _proclaim2.default.ok(r != null);
    _proclaim2.default.strictEqual(r.all, '/post/some-tag/2015-01-01_a-slug');
    _proclaim2.default.strictEqual(r.controller, 'post');
    _proclaim2.default.strictEqual(r.action, 'view');
    _proclaim2.default.strictEqual(r.namedParams.size, 3);
    _proclaim2.default.strictEqual(r.namedParams.get('tagKey'), 'some-tag');
    _proclaim2.default.strictEqual(r.namedParams.get('date'), '2015-01-01');
    _proclaim2.default.strictEqual(r.namedParams.get('slug'), 'a-slug');
});

test('Router generator default', () => {
    let url = router.urlGenerator('en', 'default', { controller: 'post', action: 'view' });
    _proclaim2.default.strictEqual(url, '/post/view.html');
});

test('Router generator postView', () => {
    let url = router.urlGenerator('en', 'postView', { id: '001', slug: 'Le-Premier-Billet' });
    _proclaim2.default.strictEqual(url, '/post/001-Le-Premier-Billet.htm');

    url = router.urlGenerator('fr', 'postView', { id: '001', slug: 'Le-Premier-Billet' });
    _proclaim2.default.strictEqual(url, '/article/001-Le-Premier-Billet.htm');
});
//# sourceMappingURL=test.js.map