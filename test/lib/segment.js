'use strict';

var _RouterBuilder = require('../../lib/RouterBuilder/RouterBuilder');

var _RouterBuilder2 = _interopRequireDefault(_RouterBuilder);

var _RoutesTranslations = require('../../lib/RoutesTranslations');

var _RoutesTranslations2 = _interopRequireDefault(_RoutesTranslations);

var _assert = require('assert');

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const routesLangsConfig = fs.readYamlFileSync('example/routesLangs.yml');
const routesLangsConfig = new Map([['login', new Map([['en', 'login']])], ['response', new Map([['en', 'response']])]]); /* global test */


const routesTranslations = new _RoutesTranslations2.default(routesLangsConfig);

const builder = new _RouterBuilder2.default(routesTranslations, ['en']);
const router = builder.router;

builder.add('/', '/', 'site.index').addSegment('/login[/${strategy}]', {}, segment => {
    segment.add('loginResponse', '/response', 'site.loginResponse').defaultRoute('login', 'site.login');
}).add('default', '/${action}', 'default.index');

const routes = router._routes;

test('router routes regExp, in order', () => {
    (0, _assert.strictEqual)(routes[0].routes.get('en').regExp.source, /^\/$/.source);
    (0, _assert.strictEqual)(routes[1].routes.get('en').regExp.source, /^\/login(?:\/([^\/.]+))?(.*)$/.source);
    (0, _assert.strictEqual)(routes[2].routes.get('en').regExp.source, /^\/([^\/.]+)$/.source);
});

test('login segment', () => {
    const route = routes[1];

    (0, _assert.deepEqual)(route.namedParams, ['strategy']);
    (0, _assert.strictEqual)(route.subRoutes.length, 2);
});

test('login segment subRoute loginResponse', () => {
    const route = routes[1];
    const subRouteLoginResponse = route.subRoutes[0];
    (0, _assert.strictEqual)(subRouteLoginResponse, router.get('loginResponse'));
});

test('login segment subRoute login', () => {
    const route = routes[1];
    const subRouteLogin = route.subRoutes[1];
    (0, _assert.strictEqual)(subRouteLogin, router.get('login'));
});

test('login url', () => {
    let rr = router.get('login');
    (0, _assert.ok)(rr != null);
    (0, _assert.strictEqual)(rr.controller, 'site');
    (0, _assert.strictEqual)(rr.action, 'login');

    let en = rr.get('en');
    (0, _assert.strictEqual)(en.url(), '/login');
    (0, _assert.strictEqual)(en.url({ strategy: 'google' }), '/login/google');
});

test('loginResponse url', () => {
    let rr = router.get('loginResponse');
    (0, _assert.ok)(rr != null);
    (0, _assert.strictEqual)(rr.controller, 'site');
    (0, _assert.strictEqual)(rr.action, 'loginResponse');

    let en = rr.get('en');
    (0, _assert.strictEqual)(en.url(), '/login/response');
    (0, _assert.strictEqual)(en.url({ strategy: 'google' }), '/login/google/response');
});

test('find /login', () => {
    let r = router.find('/login', 'en');
    (0, _assert.ok)(r != null);
    (0, _assert.strictEqual)(r.all, '/login');
    (0, _assert.strictEqual)(r.controller, 'site');
    (0, _assert.strictEqual)(r.action, 'login');
});

test('find /login/google', () => {
    let r = router.find('/login/google', 'en');
    (0, _assert.ok)(r != null);
    (0, _assert.strictEqual)(r.all, '/login/google');
    (0, _assert.strictEqual)(r.controller, 'site');
    (0, _assert.strictEqual)(r.action, 'login');
    (0, _assert.strictEqual)(r.namedParams.size, 1);
    (0, _assert.strictEqual)(r.namedParams.get('strategy'), 'google');
});

test('find /login/google/response', () => {
    let r = router.find('/login/google/response', 'en');
    (0, _assert.ok)(r != null);
    (0, _assert.strictEqual)(r.all, '/login/google/response');
    (0, _assert.strictEqual)(r.controller, 'site');
    (0, _assert.strictEqual)(r.action, 'loginResponse');
    (0, _assert.strictEqual)(r.namedParams.size, 1);
    (0, _assert.strictEqual)(r.namedParams.get('strategy'), 'google');
});
//# sourceMappingURL=segment.js.map