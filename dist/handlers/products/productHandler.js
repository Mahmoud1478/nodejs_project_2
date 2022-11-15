"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validatorMw_1 = __importDefault(require("../../middlewares/validatorMw"));
var rules_1 = __importDefault(require("./schema/rules"));
var services_1 = require("./services");
exports.default = (function (App) {
    App.get("/products", services_1.index);
    App.post("/products", [(0, validatorMw_1.default)(rules_1.default)], services_1.store);
    App.put("/products/:id", [(0, validatorMw_1.default)(rules_1.default)], services_1.update);
    App.get("/products/:id", services_1.show);
    App.get("/products/:category/category", services_1.byCategoty);
    App.delete("/products/:id", services_1.destroy);
});
