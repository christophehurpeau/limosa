/* global test */
import RouterBuilder from '../../lib/RouterBuilder/RouterBuilder';
import RouteTranslations from '../../lib/RoutesTranslations';

import { ok, strictEqual, deepEqual } from 'assert';

// const routesLangsConfig = fs.readYamlFileSync('example/routesLangs.yml');
const routesLangsConfig = new Map([
    ['login', new Map([['en', 'login']])],
    ['response', new Map([['en', 'response']])],
]);

const routesTranslations = new RouteTranslations(routesLangsConfig);

const builder = new RouterBuilder(routesTranslations, ['en']);
const router = builder.router;

builder
    .add('/', '/', 'site.index')
    .addSegment('/login[/${strategy}]', {}, (segment) => {
        segment
            .add('loginResponse', '/response', 'site.loginResponse')
            .defaultRoute('login', 'site.login');
    })
    .add('default', '/${action}', 'default.index');

const routes = router._routes;

test('router routes regExp, in order', () => {
    strictEqual(routes[0].routes.get('en').regExp.source, /^\/$/.source);
    strictEqual(routes[1].routes.get('en').regExp.source, /^\/login(?:\/([^\/.]+))?(.*)$/.source);
    strictEqual(routes[2].routes.get('en').regExp.source, /^\/([^\/.]+)$/.source);
});


test('login segment', () => {
    const route = routes[1];

    deepEqual(route.namedParams, ['strategy']);
    strictEqual(route.subRoutes.length, 2);
});

test('login segment subRoute loginResponse', () => {
    const route = routes[1];
    const subRouteLoginResponse = route.subRoutes[0];
    strictEqual(subRouteLoginResponse, router.get('loginResponse'));
});

test('login segment subRoute login', () => {
    const route = routes[1];
    const subRouteLogin = route.subRoutes[1];
    strictEqual(subRouteLogin, router.get('login'));
});

test('login url', () => {
    let rr = router.get('login');
    ok(rr != null);
    strictEqual(rr.controller, 'site');
    strictEqual(rr.action, 'login');

    let en = rr.get('en');
    strictEqual(en.url(), '/login');
    strictEqual(en.url({ strategy: 'google' }), '/login/google');
});

test('loginResponse url', () => {
    let rr = router.get('loginResponse');
    ok(rr != null);
    strictEqual(rr.controller, 'site');
    strictEqual(rr.action, 'loginResponse');

    let en = rr.get('en');
    strictEqual(en.url(), '/login/response');
    strictEqual(en.url({ strategy: 'google' }), '/login/google/response');
});

test('find /login', () => {
    let r = router.find('/login', 'en');
    ok(r != null);
    strictEqual(r.all, '/login');
    strictEqual(r.controller, 'site');
    strictEqual(r.action, 'login');
});

test('find /login/google', () => {
    let r = router.find('/login/google', 'en');
    ok(r != null);
    strictEqual(r.all, '/login/google');
    strictEqual(r.controller, 'site');
    strictEqual(r.action, 'login');
    strictEqual(r.namedParams.size, 1);
    strictEqual(r.namedParams.get('strategy'), 'google');
});


test('find /login/google/response', () => {
    let r = router.find('/login/google/response', 'en');
    ok(r != null);
    strictEqual(r.all, '/login/google/response');
    strictEqual(r.controller, 'site');
    strictEqual(r.action, 'loginResponse');
    strictEqual(r.namedParams.size, 1);
    strictEqual(r.namedParams.get('strategy'), 'google');
});
