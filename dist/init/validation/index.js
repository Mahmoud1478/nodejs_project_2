"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var customRules_1 = __importDefault(require("./customRules"));
var validatorjs_1 = __importDefault(require("validatorjs"));
exports["default"] = (function () {
    customRules_1["default"].map(function (rule) {
        if (rule.type === "async") {
            validatorjs_1["default"].registerAsync(rule.name, rule.callback, rule.errorMessage);
        }
        else {
            validatorjs_1["default"].register(rule.name, rule.callback, rule.errorMessage);
        }
    });
});
