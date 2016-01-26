'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let UrlGeneratorPartArray = class UrlGeneratorPartArray {
    /**
     * @param {Array} parts
    */

    constructor(parts) {
        this.parts = parts;
    }

    /**
     * @param {Object} args
     * @returns {string}
    */
    generate(args) {
        return this.parts.map(p => p.generate(args)).join('');
    }

};
exports.default = UrlGeneratorPartArray;
//# sourceMappingURL=UrlGeneratorPartArray.js.map