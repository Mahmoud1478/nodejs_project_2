"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rules = function (req) {
    var schema = {
        category: "nullable",
        price: "required|numeric",
    };
    switch (req.method) {
        case "POST":
            schema.name = "required|unique:products,name";
            break;
        case "PUT":
        case "PATCH":
            schema.name = "required|unique:products,name,".concat(req.params.id);
            break;
    }
    return schema;
};
exports.default = rules;
