"use strict";
exports.__esModule = true;
var rules = function (req) {
    var schema = {
        lastname: "required"
    };
    switch (req.method) {
        case "POST":
            schema.firstname = "required|unique:users,firstname";
            schema.password = "required";
            break;
        case "PUT":
        case "PATCH":
            schema.fristname = "required|unique:users,firstname,".concat(req.params.id);
            schema.password = "nullable";
            break;
    }
    return schema;
};
exports["default"] = rules;
