"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
var throwError = function (message, err) {
    throw new Error("ERROR\t".concat(message, ":\n\t").concat(err));
};
exports.throwError = throwError;
