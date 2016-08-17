/* global suite, test, setup, teardown */
import RouterBuilder from '../../lib/RouterBuilder/RouterBuilder';
import RouteTranslations from '../../lib/RoutesTranslations';
import { ok, strictEqual, deepEqual } from 'assert';

const routesLangsConfig = new Map([
    ['post', new Map([['en', 'post'], ['fr', 'article']])],
    ['view', new Map([['en', 'view'], ['fr', 'afficher']])],
]);

const routesTranslations = new RouteTranslations(routesLangsConfig);


suite('builder', () => {
    let builder;
    setup(() => builder = new RouterBuilder(routesTranslations, ['en', 'fr']));
    teardown(() => builder = null);

    suite('home', () => {
        const testHome = () => {
            const router = builder.router;
            const rr = router.get('home');
            ok(rr != null);
            strictEqual(rr.controller, 'site');
            strictEqual(rr.action, 'index');
            strictEqual(rr.getNamedParamsCount(), 0);
            const en = rr.get('en');
            strictEqual(en.regExp.source, '^\\/$');
            strictEqual(en.url(), '/');
            const fr = rr.get('fr');
            strictEqual(fr.regExp.source, '^\\/$');
            strictEqual(fr.url(), '/');
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
            const getRouteLang = (lang) => getRoute().get(lang);

            test('exists', () => ok(getRoute()));
            test('controller is site', () => strictEqual(getRoute().controller, 'site'));
            test('action is index', () => strictEqual(getRoute().action, 'index'));
            test('has no named params', () => strictEqual(getRoute().getNamedParamsCount(), 0));

            test('has "en" route', () => ok(getRouteLang('en')));
            test('check "en" route regexp', () => strictEqual(
                getRouteLang('en').regExp.source,
                '^(?:\\.(html))?$',
            ));
            test('check "en" url generator', () => strictEqual(
                getRouteLang('en').url({ controller: 'post' }),
                '/post.html',
            ));

            test('has "fr" route', () => ok(getRouteLang('fr')));
            test('check "fr" route regexp', () => strictEqual(
                getRouteLang('fr').regExp.source,
                '^(?:\\.(html))?$',
            ));
            test('check "fr" url generator', () => strictEqual(
                getRouteLang('fr').url({ controller: 'post' }),
                '/article.html',
            ));
        });

        suite('default', () => {
            const getRoute = () => builder.router.get('default');
            const getRouteLang = (lang) => getRoute().get(lang);

            test('exists', () => ok(getRoute()));
            test('controller is site', () => strictEqual(getRoute().controller, 'site'));
            test('action is index', () => strictEqual(getRoute().action, 'index'));
            test('has 1 named params', () => strictEqual(getRoute().getNamedParamsCount(), 1));
            test('named param is "action"', () => deepEqual(getRoute().namedParams, ['action']));

            test('has "en" route', () => ok(getRouteLang('en')));
            test('check "en" route regexp', () => strictEqual(
                getRouteLang('en').regExp.source,
                /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source,
            ));
            test('check "en" url generator', () => strictEqual(
                getRouteLang('en').url({ controller: 'post', action: 'view' }),
                '/post/view.html',
            ));

            test('has "fr" route', () => ok(getRouteLang('fr')));
            test('check "fr" route regexp', () => strictEqual(
                getRouteLang('fr').regExp.source,
                /^\/([^\/.]+)(?:\/([^.]*))?(?:\.(html))?$/.source,
            ));
            test('check "fr" url generator', () => strictEqual(
                getRouteLang('fr').url({ controller: 'post', action: 'view' }),
                '/article/afficher.html',
            ));
        });
    });
});
