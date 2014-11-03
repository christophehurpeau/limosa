/**
 * @class Route
 */
export default class Route {
    /**
     * @param {String} all
     * @param {String} controller
     * @param {String} action
     * @param {Map} namedParams
     * @param {Array} otherParams
     * @param {String} extension
     */
    constructor(all, controller, action, namedParams, otherParams, extension) {
        this.all = all;
        this.controller = controller;
        this.action = action;
        this.namedParams = namedParams;
        this.otherParams = otherParams;
        this.extension = extension;
        Object.freeze(this);
    }
}
