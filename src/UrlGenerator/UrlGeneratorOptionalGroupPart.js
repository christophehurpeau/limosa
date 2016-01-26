export default class UrlGeneratorOptionalGroupPart {
    parts: UrlGeneratorPartArray;

    constructor(parts: UrlGeneratorPartArray) {
        this.parts = parts;
    }

    /**
     * @param {Object} args
     * @returns {string}
     */
    generate(args) {
        try {
            return this.parts.generate(args);
        } catch (err) {
            return '';
        }
    }
}
