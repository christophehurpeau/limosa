"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlGenerator = /**
                    * @function
                   */function () {
    /**
     * @param {UrlGeneratorPartArray} parts
     * @param {string} extension
    * @function
    */

    function UrlGenerator(parts, extension) {
        _classCallCheck(this, UrlGenerator);

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


    _createClass(UrlGenerator, [{
        key: "generate",
        value: /**
                * @function
                * @param args
               */function generate(args) {
            try {
                var url = this.parts.generate(args);

                if (args) {
                    if (args.extension) {
                        url += "." + args.extension;
                    } else if (this.extension) {
                        url += "." + this.extension;
                    }

                    if (args.queryString) {
                        url += "?" + args.queryString; // TODO: use qs ?
                    }

                    if (args.hash) {
                        url += "#" + args.hash;
                    }
                } else if (this.extension) {
                    url += "." + this.extension;
                }

                return url;
            } catch (err) {
                throw new Error("Failed to generate url: " + err.message + " args=" + JSON.stringify(args));
            }
        }
    }]);

    return UrlGenerator;
}();

exports.default = UrlGenerator;
//# sourceMappingURL=UrlGenerator.js.map