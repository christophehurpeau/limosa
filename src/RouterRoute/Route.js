import RouterRouteCommon from './Common';

export default class RouterRoute extends RouterRouteCommon {
    /**
     * @param {string} key
     * @param {string} controller
     * @param {string} action
     * @param {string} [extension]
     * @param {Array} namedParams
     */
    constructor(key, controller, action, extension, namedParams) {
        super(namedParams);
        this.key = key;
        this.controller = controller;
        this.action = action;
        this.extension = extension;
    }
}
