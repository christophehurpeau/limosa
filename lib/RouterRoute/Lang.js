"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let RouterRouteLang = class RouterRouteLang {
    /**
     * @param {RegExp} regExp
     * @param {RouteRouteLangUrlGenerator} urlGenerator
    */
    constructor(regExp, urlGenerator) {
        this.regExp = regExp;
        this.urlGenerator = urlGenerator;
    }

    /**
     * @param {string} input
     * @return {Array}
    */
    match(input) {
        return input.match(this.regExp);
    }

    /**
     * Url generator
     *
     * @param {object} args
     * @returns {string}
     * @throws Error
    */
    url(args) {
        return this.urlGenerator.generate(args);
    }
};
exports.default = RouterRouteLang;
//# sourceMappingURL=Lang.js.map