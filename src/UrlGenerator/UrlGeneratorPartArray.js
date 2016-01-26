export default class UrlGeneratorPartArray {
    // parts: Array;

    /**
     * @param {Array} parts
     */
    constructor(parts) {
        this.parts = parts;
    }

    /**
     * @param {object} args
     * @returns {string}
     */
    generate(args) {
        return this.parts.map(p => p.generate(args)).join('');
    }

}
