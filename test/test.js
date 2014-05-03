var RouteBuilder = require('../lib/builder');
var RouteTranslations = require('../lib/routes_translations');

var assert = require('proclaim');
var expect = assert.strictEqual;
var fs = require('springbokjs-utils/fs');

var routesLangsConfig = fs.readYamlFileSync('example/routesLangs.yml');
var rt = new RouteTranslations(routesLangsConfig);

test('RouteTranslations', function() {
    expect(rt.translate('login', 'fr'), 'connexion');
    expect(rt.untranslate('connexion', 'fr'), 'login');
});

var router = require('../example/router');

test('SimpleRoute', function() {
    var rr = router.get('/');
    assert.ok(rr != null);
    expect(rr.controller, 'Site');
    expect(rr.action, 'index');
    expect(rr.getNamedParamsCount(), 0);
    var en = rr.routes.en;
    expect(en.regExp.source, '^\\/$');
    expect(en.strf,'/');
    var fr = rr.routes.fr;
    expect(fr.regExp.source, '^\\/$');
    expect(fr.strf,'/');
});

test('Common route', function() {
    var rrs = router.get('defaultSimple');
    assert.ok(rrs != null);
    expect(rrs.controller, 'Site');
    expect(rrs.action, 'index');
    expect(rrs.getNamedParamsCount(), 0);
    var rsen = rrs.get('en');
    expect(rsen.regExp.source, '^(?:\\.(html))?$');
    expect(rsen.strf,'/%s');
    var rsfr = rrs.get('fr');
    expect(rsfr.regExp.source, '^(?:\\.(html))?$');
    expect(rsfr.strf,'/%s');
    
    var rr = router.get('default');
    assert.ok(rr != null);
    expect(rr.controller, 'Site');
    expect(rr.action, 'index');
    assert.deepEqual(rr.namedParams, ['action']);
    expect(rr.getNamedParamsCount(), 1);
    var en = rr.get('en');
    expect(en.regExp.source, '^\\/([^/.]+)(?:\\/([^.]*))?(?:\\.(html))?$');
    expect(en.strf,'/%s/%s%s');
    var fr = rr.get('fr');
    expect(en.regExp.source, '^\\/([^/.]+)(?:\\/([^.]*))?(?:\\.(html))?$');
    expect(fr.strf,'/%s/%s%s');
});

test('Named param route', function() {
    var rr = router.get('postView');
    assert.ok(rr != null);
    expect(rr.controller, 'Post');
    expect(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['id', 'slug']);
    expect(rr.getNamedParamsCount(), 2);
    var en = rr.get('en');
    expect(en.regExp.source, '^\\/post\\/([0-9]+)\\-([A-Za-z\-]+)\\.(htm)$');
    expect(en.strf,'/post/%s-%s');
    var fr = rr.routes.fr;
    expect(fr.regExp.source, '^\\/article\\/([0-9]+)\\-([A-Za-z\-]+)\\.(htm)$');
    expect(fr.strf,'/article/%s-%s');
});

test('More complex param route', function() {
    var rr = router.get('postWithDate');
    assert.ok(rr != null);
    expect(rr.controller, 'Post');
    expect(rr.action, 'view');
    assert.deepEqual(rr.namedParams, ['tagKey', 'date', 'slug']);
    expect(rr.getNamedParamsCount(), 3);
    var en = rr.get('en');
    expect(en.regExp.source, '^\\/post(?:\\/([^/.]+))?(?:\\/(\\d{4}\\-\\d{2}\\-\\d{2})_([^/.]+))$');
    expect(en.strf,'/post/%s/%s_%s');
    var fr = rr.routes.fr;
    expect(fr.regExp.source, '^\\/article(?:\\/([^/.]+))?(?:\\/(\\d{4}\\-\\d{2}\\-\\d{2})_([^/.]+))$');
    expect(fr.strf,'/article/%s/%s_%s');
});


test('Find simple routes', function() {
    var r = router.find('/', 'en');
    assert.ok(r != null);
    expect(r.all, '/');
    expect(r.controller, 'Site');
    expect(r.action, 'index');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    expect(r.otherParams, undefined);
    
    r = router.find('/', 'fr');
    assert.ok(r != null);
    expect(r.all, '/');
    expect(r.controller, 'Site');
    expect(r.action, 'index');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    expect(r.otherParams, undefined);
});

test('Find common routes, /:controller', function() {
    var r = router.find('/post', 'en');
    assert.ok(r != null);
    expect(r.all, '/post');
    expect(r.controller, 'Post');
    expect(r.action, 'index');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    expect(r.otherParams, undefined);
    
    r = router.find('/post.html', 'en');
    assert.ok(r != null);
    expect(r.all, '/post.html');
    expect(r.controller, 'Post');
    expect(r.extension, 'html');
    expect(r.namedParams, undefined);
    
    r = router.find('/article', 'fr');
    assert.ok(r != null);
    expect(r.all, '/article');
    expect(r.controller, 'Post');
    expect(r.action, 'index');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    expect(r.otherParams, undefined);

    r = router.find('/article.html', 'fr');
    assert.ok(r != null);
    expect(r.all, '/article.html');
    expect(r.controller, 'Post');
    expect(r.extension, 'html');
    expect(r.namedParams, undefined);
});

test('Find common routes, /:controller/:action', function() {
    var r = router.find('/post/view', 'en');
    assert.ok(r != null);
    expect(r.all, '/post/view');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    expect(r.otherParams, undefined);
    
    r = router.find('/post/view.html', 'en');
    assert.ok(r != null);
    expect(r.all, '/post/view.html');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, 'html');
    expect(r.namedParams, undefined);
    
    r = router.find('/article/afficher', 'fr');
    assert.ok(r != null);
    expect(r.all, '/article/afficher');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    expect(r.otherParams, undefined);

    r = router.find('/article/afficher.html', 'fr');
    assert.ok(r != null);
    expect(r.all, '/article/afficher.html');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, 'html');
    expect(r.namedParams, undefined);
});
  

  test('Find common routes, /:controller/:action/*', function() {
    var r = router.find('/post/view/test1/test2', 'en');
    assert.ok(r != null);
    expect(r.all, '/post/view/test1/test2');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);
    
    r = router.find('/post/view/test1/test2.html', 'en');
    assert.ok(r != null);
    expect(r.all, '/post/view/test1/test2.html');
    expect(r.controller, 'Post');
    expect(r.extension, 'html');
    expect(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);
    
    r = router.find('/article/afficher/test1/test2', 'fr');
    assert.ok(r != null);
    expect(r.all, '/article/afficher/test1/test2');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, undefined);
    expect(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);

    r = router.find('/article/afficher/test1/test2.html', 'fr');
    assert.ok(r != null);
    expect(r.all, '/article/afficher/test1/test2.html');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, 'html');
    expect(r.namedParams, undefined);
    assert.deepEqual(r.otherParams, ['test1', 'test2']);
});
  

  test('Find named param route', function() {
    var r = router.find('/post/001-The-First-Post.htm', 'en');
    assert.ok(r != null);
    expect(r.all, '/post/001-The-First-Post.htm');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, 'htm');
    var namedParams = r.namedParams;
    assert.isInstanceOf(namedParams, Map);
    expect(r.namedParams.size, 2);
    expect(r.namedParams.get('id'), '001');
    expect(r.namedParams.get('slug'), 'The-First-Post');
    expect(r.otherParams, undefined);
    
    r = router.find('/article/001-Le-Premier-Billet.htm', 'fr');
    assert.ok(r != null);
    expect(r.all, '/article/001-Le-Premier-Billet.htm');
    expect(r.controller, 'Post');
    expect(r.action, 'view');
    expect(r.extension, 'htm');
    var namedParams = r.namedParams;
    assert.isInstanceOf(namedParams, Map);
    expect(r.namedParams.size, 2);
    expect(r.namedParams.get('id'), '001');
    expect(r.namedParams.get('slug'), 'Le-Premier-Billet');
    expect(r.otherParams, undefined);
});