"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signInRules = function () {
    var schema = {
        firstname: "required",
        password: "required",
    };
    return schema;
};
exports.default = signInRules;
