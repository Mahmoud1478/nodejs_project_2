"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signUpRules = function () {
    var schema = {
        firstname: "required:unique:users,firstname",
        lastname: "required",
        password: "required",
    };
    return schema;
};
exports.default = signUpRules;
