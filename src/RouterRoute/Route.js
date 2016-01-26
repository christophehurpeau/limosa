import RouterRouteCommon from './Common';

export default class RouterRoute extends RouterRouteCommon {
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
}
