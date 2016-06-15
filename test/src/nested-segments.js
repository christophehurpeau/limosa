/* global test */
import RouterBuilder from '../../lib/RouterBuilder/RouterBuilder';
import RouteTranslations from '../../lib/RoutesTranslations';

import { ok, strictEqual } from 'assert';

// const routesLangsConfig = fs.readYamlFileSync('example/routesLangs.yml');
const routesLangsConfig = new Map([
    ['api', new Map([['en', 'api']])],
    ['rooms', new Map([['en', 'rooms']])],
    ['book', new Map([['en', 'book']])],
]);

const routesTranslations = new RouteTranslations(routesLangsConfig);

const builder = new RouterBuilder(routesTranslations, ['en']);
const router = builder.router;

builder
    .addSegment('/api', segment => {
        segment.addSegment('/rooms', segment => {
            segment.addSegment('/${roomName}', segment => {
                segment.add('api/room/book', '/book', 'api.room/book');
                segment.defaultRoute('api/room', 'api.room');
            });
            segment.defaultRoute('api/rooms', 'api.rooms');
        });
    });

const routes = router._routes;

test('router routes regExp, in order', () => {
    strictEqual(routes.length, 1);
    const apiRoute = routes[0];
    strictEqual(apiRoute.routes.get('en').regExp.source, /^\/api(.*)$/.source);
    strictEqual(apiRoute.subRoutes.length, 1);
    strictEqual(apiRoute.subRoutes[0].get('en').regExp.source, /^\/rooms(.*)$/.source);

    const roomsRoute = apiRoute.subRoutes[0];
    strictEqual(roomsRoute.subRoutes.length, 2);
    strictEqual(roomsRoute.subRoutes[0].get('en').regExp.source, /^\/([^\/.]+)(.*)$/.source);

    const namedRoomRoute = roomsRoute.subRoutes[0];
    strictEqual(namedRoomRoute.subRoutes.length, 2);
    strictEqual(namedRoomRoute.subRoutes[0].get('en').regExp.source, /^\/book$/.source);
    strictEqual(namedRoomRoute.subRoutes[1].get('en').regExp.source, /^$/.source);
});

test('api/room generate url', () => {
    let rr = router.get('api/room');
    ok(rr != null);
    let en = rr.get('en');

    strictEqual(en.url({ roomName: 'tokyo' }), '/api/rooms/tokyo');
});

test('find /api/rooms/tokyo', () => {
    let r = router.find('/api/rooms/tokyo', 'en');
    ok(r != null);
    strictEqual(r.all, '/api/rooms/tokyo');
    strictEqual(r.controller, 'api');
    strictEqual(r.action, 'room');
    strictEqual(r.namedParams.size, 1);
    strictEqual(r.namedParams.get('roomName'), 'tokyo');
});
