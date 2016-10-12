export default class UrlGenerator {
    /**
     * @param {UrlGeneratorPartArray} parts
     * @param {string} extension
     */
    constructor(parts, extension) {
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
        try {
            let url = this.parts.generate(args);

            if (args) {
                if (args.extension) {
                    url += `.${args.extension}`;
                } else if (this.extension) {
                    url += `.${this.extension}`;
                }

                if (args.queryString) {
                    url += `?${args.queryString}`; // TODO: use qs ?
                }

                if (args.hash) {
                    url += `#${args.hash}`;
                }
            } else if (this.extension) {
                url += `.${this.extension}`;
            }

            return url;
        } catch (err) {
            throw new Error(`Failed to generate url: ${err.message} args=${JSON.stringify(args)}`);
        }
    }
}
