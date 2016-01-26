export default class UrlGeneratorOptionalGroupPart {
    // parts: UrlGeneratorPartArray;

    /**
     * @param {UrlGeneratorPartArray} parts
     */
    constructor(parts) {
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
