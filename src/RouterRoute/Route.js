import RouterRouteCommon from './Common';

export default class RouterRoute extends RouterRouteCommon {
    constructor(controller, action, extension, namedParams) {
        super(namedParams);
        this.controller = controller;
        this.action = action;
        this.extension = extension;
    }
}
