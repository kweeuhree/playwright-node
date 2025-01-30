"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSort = void 0;
var validateSort = function (dateStrings) {
    // If date strings is a single string, it means it holds an error, return
    if (typeof dateStrings === "string") {
        return false;
    }
    // Verify order of dates
    return dateStrings.every(function (element, index, arr) {
        if (index === 0)
            return true;
        return arr[index - 1] >= element;
    });
};
exports.validateSort = validateSort;
