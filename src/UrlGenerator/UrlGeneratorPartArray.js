export default class UrlGeneratorPartArray {
    parts: Array;

    constructor(parts: Array) {
        this.parts = parts;
    }

    /**
     * @param {Object} args
     * @returns {string}
     */
    generate(args) {
        return this.parts.map(p => p.generate(args)).join('');
    }

}
