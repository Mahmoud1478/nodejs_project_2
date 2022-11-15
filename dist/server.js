"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userHandler_1 = __importDefault(require("./handlers/users/userHandler"));
var productHandler_1 = __importDefault(require("./handlers/products/productHandler"));
var validation_1 = __importDefault(require("./init/validation"));
var App = (0, express_1.default)();
var port = 3000;
App.listen(port, function () {
    console.log("\nApplication started in http://localhost:".concat(port));
    (0, validation_1.default)();
});
App.use(body_parser_1.default.json());
App.get("/", function (request, response) {
    response.send("welcome ");
});
(0, userHandler_1.default)(App);
(0, productHandler_1.default)(App);
exports.default = App;
