/**
 * @class
 */
export default class RouterRouteLang {
    /**
     * @constructs
     * @param {RegExp} regExp
     * @param {String} strf
     */
    constructor(regExp, strf) {
        this.regExp = regExp;
        this.strf = strf == '/' ? '/' : strf.replace(/\/+$/, '');
    }

    /**
     *
     * @return {Array} [description]
     */
    match(input) {
        return input.match(this.regExp);
    }
}
