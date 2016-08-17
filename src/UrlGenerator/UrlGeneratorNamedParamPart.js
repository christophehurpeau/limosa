export default class UrlGeneratorNamedParamPart {
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
    generate(args: Object) {
        if (!args || args[this.paramName] == null) {
            throw new Error(`Missing param name: "${this.paramName}"`);
        }

        if (this.paramName === 'controller' || this.paramName === 'action') {
            return this.translate(args[this.paramName]);
        }

        return args[this.paramName];
    }
}
