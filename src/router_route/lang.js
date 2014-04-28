var S = require('springbokjs-utils');

/**
 * @class
 */
var RouterRouteLang = S.newClass();
module.exports = RouterRouteLang;

RouterRouteLang.extendPrototype( /** @lends RouterRouteLang.prototype */ {
    /**
     * @constructs
     * @param {RegExp} regExp
     * @param {String} strf
     */
    construct(regExp, strf) {
        this.regExp = regExp;
        this.strf = strf == '/' ? '/' : strf.replace(/\/+$/, '');
    },

    /**
     *
     * @return {Array} [description]
     */
    match(input) {
        return input.match(this.regExp);
    }
});