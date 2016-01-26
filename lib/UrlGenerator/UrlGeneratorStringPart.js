"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let UrlGeneratorStringPart = class UrlGeneratorStringPart {
    /**
     * @param {string} string
    */
    constructor(string) {
        this.string = string;
    }

    /**
     * @returns {string}
     */
    generate() {
        return this.string;
    }
};
exports.default = UrlGeneratorStringPart;
//# sourceMappingURL=UrlGeneratorStringPart.js.map