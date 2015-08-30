export default class UrlGeneratorOptionalGroupPart {
    parts: UrlGeneratorPartArray;

    constructor(parts: UrlGeneratorPartArray) {
        this.parts = parts;
    }

    generate() {
        try {
            return this.parts.generate(args);
        } catch (err) {
            return '';
        }
    }
}
