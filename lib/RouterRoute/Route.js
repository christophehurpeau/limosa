'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RouterRoute = class RouterRoute extends _Common2.default {
    /**
     * @param {string} controller
     * @param {string} action
     * @param {string} [extension]
     * @param {Array} namedParams
    */
    constructor(controller, action, extension, namedParams) {
        super(namedParams);
        this.controller = controller;
        this.action = action;
        this.extension = extension;
    }
};
exports.default = RouterRoute;
//# sourceMappingURL=Route.js.map