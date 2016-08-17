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

const routesLangsConfig = new Map([['post', new Map([['en', 'post'], ['fr', 'article']])], ['view', new Map([['en', 'view'], ['fr', 'afficher']])]]); /* global suite, test, setup, teardown */


const routesTranslations = new _RoutesTranslations2.default(routesLangsConfig);

suite('builder', () => {
    let builder;
    setup(() => builder = new _RouterBuilder2.default(routesTranslations, ['en', 'fr']));
    teardown(() => builder = null);

    suite('home', () => {
        const testHome = () => {
            const router = builder.router;
            const rr = router.get('home');
            (0, _assert.ok)(rr != null);
            (0, _assert.strictEqual)(rr.controller, 'site');
            (0, _assert.strictEqual)(rr.action, 'index');
            (0, _assert.strictEqual)(rr.getNamedParamsCount(), 0);
            const en = rr.get('en');
            (0, _assert.strictEqual)(en.regExp.source, '^\\/$');
            (0, _assert.strictEqual)(en.url(), '/');
            const fr = rr.get('fr');
            (0, _assert.strictEqual)(fr.regExp.source, '^\\/$');
            (0, _assert.strictEqual)(fr.url(), '/');
        };

        test('add home route, with arguments', () => {
            builder.add('home', '/', 'site.index');
            testHome();
        });

        test('add home route, with object', () => {
            builder.add({ key: 'home', url: '/', controller: 'site', action: 'index' });
            testHome();
        });
    });

    suite('default routes', () => {
        setup(() => builder.addDefaultRoutes());

        suite('defaultSimple', () => {
            const getRoute = () => builder.router.get('defaultSimple');
            const getRouteLang = lang => getRoute().get(lang);

            test('exists', () => (0, _assert.ok)(getRoute()));
            test('controller is site', () => (0, _assert.strictEqual)(getRoute().controller, 'site'));
            test('action is index', () => (0, _assert.strictEqual)(getRoute().action, 'index'));
            test('has no named params', () => (0, _assert.strictEqual)(getRoute().getNamedParamsCount(), 0));

            test('has "en" route', () => (0, _assert.ok)(getRouteLang('en')));
            test('check "en" route regexp', () => (0, _assert.strictEqual)(getRouteLang('en').regExp.source, '^(?:\\.(html))?$'));
            test('check "en" url generator', () => (0, _assert.strictEqual)(getRouteLang('en').url({ controller: 'post' }), '/post.html'));

            test('has "fr" route', () => (0, _assert.ok)(getRouteLang('fr')));
            test('check "fr" route regexp', () => (0, _assert.strictEqual)(getRouteLang('fr').regExp.source, '^(?:\\.(html))?$'));
            test('check "fr" url generator', () => (0, _assert.strictEqual)(getRouteLang('fr').url({ controller: 'post' }), '/article.html'));
        });

        suite('default', () => {
            const getRoute = () => builder.router.get('default');
            const getRouteLang = lang => getRoute().get(lang);

            test('exists', () => (0, _assert.ok)(getRoute()));
            test('controller is site', () => (0, _assert.strictEqual)(getRoute().controller, 'site'));
            test('action is index', () => (0, _assert.strictEqual)(getRoute().action, 'index'));
            test('has 1 named params', () => (0, _assert.strictEqual)(getRoute().getNamedParamsCount(), 1));
            test('named param is "action"', () => (0, _assert.deepEqual)(getRoute().namedParams, ['action']));

            test('has "en" route', () => (0, _assert.ok)(getRouteLang('en')));
            test('check "en" route regexp', () => (0, _assert.strictEqual)(getRouteLang('en').regExp.source, /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source));
            test('check "en" url generator', () => (0, _assert.strictEqual)(getRouteLang('en').url({ controller: 'post', action: 'view' }), '/post/view.html'));

            test('has "fr" route', () => (0, _assert.ok)(getRouteLang('fr')));
            test('check "fr" route regexp', () => (0, _assert.strictEqual)(getRouteLang('fr').regExp.source, /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source));
            test('check "fr" url generator', () => (0, _assert.strictEqual)(getRouteLang('fr').url({ controller: 'post', action: 'view' }), '/article/afficher.html'));
        });
    });
});
//# sourceMappingURL=builder.js.map