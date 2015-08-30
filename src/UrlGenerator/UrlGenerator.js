export default class UrlGenerator {

    constructor(parts: UrlGeneratorPartArray, extension) {
        this.parts = parts;
        this.extension = extension;
    }

    /**
     * @param {object} args
     * @param {string} [args.extension]
     * @param {string} [args.queryString]
     * @param {string} [args.hash]
     * @returns {*}
     */
    generate(args) {
        let url = this.parts.generate(args);

        if (args) {
            if (args.extension) {
                url += '.' + args.extension;
            } else if (this.extension) {
                url += '.' + this.extension;
            }

            if (args.queryString) {
                url += '?' + args.queryString; // TODO: use qs ?
            }

            if (args.hash) {
                url += '#' + args.hash;
            }
        } else if (this.extension) {
            url += '.' + this.extension;
        }

        return url;
    }
}
