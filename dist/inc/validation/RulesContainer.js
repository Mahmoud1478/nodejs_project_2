"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequiredRule_1 = __importDefault(require("./rules/RequiredRule"));
var UniqueRule_1 = __importDefault(require("./rules/UniqueRule"));
var container = {
    required: RequiredRule_1.default,
    unique: UniqueRule_1.default,
};
exports.default = container;
