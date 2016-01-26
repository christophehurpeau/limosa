/**
 * Convert a simple conf file key=>value into a two-way translation map
 */
export default class RoutesTranslations {
    /**
     * @param {Map} translations
     */
    constructor(translations) {
        this._languages = new Map();

        if (!translations) {
            return;
        }

        for (let [key, translationsMap] of translations) {
            for (let [lang, translation] of translationsMap) {
                if (!this._languages.has(lang)) {
                    this._languages.set(
                        lang,
                        {
                            translate: new Map(),
                            untranslate: new Map(),
                        }
                    );
                }

                const language = this._languages.get(lang);

                language.translate.set(key.toLowerCase(), translation);
                language.untranslate.set(translation.toLowerCase(), key);
            }
        }
    }

    /**
     * @param {string} string
     * @param {string} lang
     * @return {string}
     */
    translate(string, lang) {
        string = string.toLowerCase();
        const translationsMap = this._languages.get(lang).translate;

        if (!translationsMap.has(string)) {
            throw new Error(`Missing translation ${string} for lang ${lang}`);
        }

        return translationsMap.get(string);
    }

    /**
     * @param {string} string
     * @param {string} lang
     * @return {string}
     */
    untranslate(string, lang) {
        string = string.toLowerCase();
        const translationsMap = this._languages.get(lang).untranslate;

        if (!translationsMap.has(string)) {
            throw new Error(`Missing untranslation ${string} for lang ${lang}`);
        }

        return translationsMap.get(string);
    }
}
