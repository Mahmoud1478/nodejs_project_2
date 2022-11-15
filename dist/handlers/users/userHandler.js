"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validatorMw_1 = __importDefault(require("../../middlewares/validatorMw"));
var rules_1 = __importDefault(require("./rules"));
var sign_in_1 = __importDefault(require("./rules/sign_in"));
var servies_1 = require("./servies");
exports.default = (function (App) {
    App.get("/users", servies_1.index);
    App.post("/users", [(0, validatorMw_1.default)(rules_1.default)], servies_1.store);
    App.put("/users/:id", [(0, validatorMw_1.default)(rules_1.default)], servies_1.update);
    App.get("/users/:id", servies_1.show);
    App.delete("/users/:id", servies_1.destroy);
    App.post("/users/sign-in", [(0, validatorMw_1.default)(sign_in_1.default)], servies_1.sign_in);
    App.post("/users/sign-up", [(0, validatorMw_1.default)(rules_1.default)], servies_1.sign_up);
});
