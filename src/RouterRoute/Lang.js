export default class RouterRouteLang {
    constructor(regExp: RegExp, urlGenerator: RouteRouteLangUrlGenerator) {
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
}
