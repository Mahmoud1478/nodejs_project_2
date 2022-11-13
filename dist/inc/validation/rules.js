"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = exports.intiger = void 0;
var intiger = function (name, value) {
    return {
        value: !/^\d+$/.test(value),
        msg: "".concat(name, " must be a valid integer"),
    };
};
exports.intiger = intiger;
var required = function (name, value) {
    return {
        value: value ? false : true,
        msg: "".concat(name, " is required"),
    };
};
exports.required = required;
var rules = {
    intiger: exports.intiger,
    required: exports.required,
};
exports.default = rules;
