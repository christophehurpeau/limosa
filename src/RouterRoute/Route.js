import RouterRouteCommon from './Common';

/**
 * @constructor
 */
export default class RouterRoute extends RouterRouteCommon {
    /**
     * @constructs
     */
    constructor(controller, action, extension, namedParams) {
        super(namedParams);
        this.controller = controller;
        this.action = action;
        this.extension = extension;
    }
}
