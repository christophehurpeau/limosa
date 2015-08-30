export default class UrlGeneratorStringPart {
    constructor(string) {
        this.string = string;
    }

    generate() {
        return this.string;
    }
}
