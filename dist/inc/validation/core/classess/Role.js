"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rule = /** @class */ (function () {
    function Rule(request, lable, value) {
        this.request = request;
        this.lable = lable;
        this.value = value;
    }
    Rule.prototype.fails = function () {
        return !!this.errors;
    };
    Rule.prototype.getErrors = function () {
        return this.errors;
    };
    return Rule;
}());
exports.default = Rule;
