"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validatorMw_1 = __importDefault(require("../../middlewares/validatorMw"));
var rules_1 = __importDefault(require("./schema/rules"));
var sign_in_1 = __importDefault(require("./schema/sign_in"));
var sign_up_1 = __importDefault(require("./schema/sign_up"));
var services_1 = require("./services");
exports.default = (function (App) {
    App.get("/users", services_1.index);
    App.post("/users", [(0, validatorMw_1.default)(rules_1.default)], services_1.store);
    App.put("/users/:id", [(0, validatorMw_1.default)(rules_1.default)], services_1.update);
    App.get("/users/:id", services_1.show);
    App.delete("/users/:id", services_1.destroy);
    App.post("/sign-in", [(0, validatorMw_1.default)(sign_in_1.default)], services_1.sign_in);
    App.post("/sign-up", [(0, validatorMw_1.default)(sign_up_1.default)], services_1.sign_up);
});