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
const routesLangsConfig = new Map([['api', new Map([['en', 'api']])], ['rooms', new Map([['en', 'rooms']])], ['book', new Map([['en', 'book']])]]); /* global test */


const routesTranslations = new _RoutesTranslations2.default(routesLangsConfig);

const builder = new _RouterBuilder2.default(routesTranslations, ['en']);
const router = builder.router;

builder.addSegment('/api', segment => {
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
    (0, _assert.strictEqual)(routes.length, 1);
    const apiRoute = routes[0];
    (0, _assert.strictEqual)(apiRoute.routes.get('en').regExp.source, /^\/api(.*)$/.source);
    (0, _assert.strictEqual)(apiRoute.subRoutes.length, 1);
    (0, _assert.strictEqual)(apiRoute.subRoutes[0].get('en').regExp.source, /^\/rooms(.*)$/.source);

    const roomsRoute = apiRoute.subRoutes[0];
    (0, _assert.strictEqual)(roomsRoute.subRoutes.length, 2);
    (0, _assert.strictEqual)(roomsRoute.subRoutes[0].get('en').regExp.source, /^\/([^\/.]+)(.*)$/.source);

    const namedRoomRoute = roomsRoute.subRoutes[0];
    (0, _assert.strictEqual)(namedRoomRoute.subRoutes.length, 2);
    (0, _assert.strictEqual)(namedRoomRoute.subRoutes[0].get('en').regExp.source, /^\/book$/.source);
    (0, _assert.strictEqual)(namedRoomRoute.subRoutes[1].get('en').regExp.source, /^$/.source);
});

test('api/room generate url', () => {
    let rr = router.get('api/room');
    (0, _assert.ok)(rr != null);
    let en = rr.get('en');

    (0, _assert.strictEqual)(en.url({ roomName: 'tokyo' }), '/api/rooms/tokyo');
});

test('find /api/rooms/tokyo', () => {
    let r = router.find('/api/rooms/tokyo', 'en');
    (0, _assert.ok)(r != null);
    (0, _assert.strictEqual)(r.all, '/api/rooms/tokyo');
    (0, _assert.strictEqual)(r.controller, 'api');
    (0, _assert.strictEqual)(r.action, 'room');
    (0, _assert.strictEqual)(r.namedParams.size, 1);
    (0, _assert.strictEqual)(r.namedParams.get('roomName'), 'tokyo');
});
//# sourceMappingURL=nested-segments.js.map