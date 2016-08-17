'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let UrlGeneratorNamedParamPart = class UrlGeneratorNamedParamPart {
    /**
     * @param {string} paramName
     * @param {Function} translate
    */
    constructor(paramName, translate) {
        this.paramName = paramName;
        this.translate = translate;
    }

    /**
     * @param {Object} args
     * @returns {string}
    */
    generate(args) {
        if (!args || args[this.paramName] == null) {
            throw new Error(`Missing param name: "${ this.paramName }"`);
        }

        if (this.paramName === 'controller' || this.paramName === 'action') {
            return this.translate(args[this.paramName]);
        }

        return args[this.paramName];
    }
};
exports.default = UrlGeneratorNamedParamPart;
//# sourceMappingURL=UrlGeneratorNamedParamPart.js.map