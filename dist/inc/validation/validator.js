"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rules_1 = __importDefault(require("./rules"));
var validator = function (request, prams) {
    var errors = [];
    var _loop_1 = function (name, rules) {
        rules.forEach(function (rule) {
            var _a = rules_1.default[rule](name, request.query[name]), value = _a.value, msg = _a.msg;
            if (value) {
                errors.push({
                    key: name,
                    value: msg,
                });
            }
        });
    };
    for (var _i = 0, _a = Object.entries(prams); _i < _a.length; _i++) {
        var _b = _a[_i], name = _b[0], rules = _b[1];
        _loop_1(name, rules);
    }
    return errors;
};
exports.default = validator;
