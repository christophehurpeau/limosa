export default class UrlGeneratorNamedParamPart {
    constructor(paramName, translate) {
        this.paramName = paramName;
        this.translate = translate;
    }

    generate(args) {
        if (args[this.paramName] == null) {
            throw new Error(`Missing param name: "${this.paramName}"`);
        }

        if (this.paramName === 'controller' || this.paramName === 'action') {
            return this.translate(args[this.paramName]);
        }

        return args[this.paramName];
    }

}
