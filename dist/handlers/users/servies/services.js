"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = exports.edit = exports.remove = exports.save = exports.one = exports.all = void 0;
var user_1 = __importDefault(require("../../../models/user"));
var all = function () {
    return new user_1.default().select(["id", "firstname", "lastname"]).get();
};
exports.all = all;
var one = function (id) {
    return new user_1.default().select(["id", "firstname", "lastname"]).find("id", id);
};
exports.one = one;
var save = function (data) {
    return new user_1.default().create(data);
};
exports.save = save;
var remove = function (id) {
    return new user_1.default().where("id", id).delete();
};
exports.remove = remove;
var edit = function (id, data) {
    return new user_1.default().where("id", id).update(data);
};
exports.edit = edit;
var find = function (column, value) {
    return new user_1.default().find(column, value);
};
exports.find = find;
