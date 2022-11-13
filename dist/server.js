"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var App = (0, express_1["default"])();
var port = 3000;
App.listen(port, function () {
    console.log("\nApplication started in http://localhost:".concat(port));
});
App.get("/", function (request, response) {
    response.send("welcome ");
    dotenv_1["default"].config();
});
exports["default"] = App;
