"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let Route = class Route {
    /**
     * @param {string} key
     * @param {string} all
     * @param {string} controller
     * @param {string} action
     * @param {Map} namedParams
     * @param {Array} otherParams
     * @param {string} extension
    */
    constructor(key, all, controller, action, namedParams, otherParams, extension) {
        this.key = key;
        this.all = all;
        this.controller = controller;
        this.action = action;
        this.namedParams = namedParams;
        this.otherParams = otherParams;
        this.extension = extension;
        Object.freeze(this);
    }
};
exports.default = Route;
//# sourceMappingURL=Route.js.map