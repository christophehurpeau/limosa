export default class UrlGeneratorStringPart {
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
}
