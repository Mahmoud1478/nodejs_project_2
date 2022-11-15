"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign_in = exports.sign_up = exports.destroy = exports.update = exports.show = exports.store = exports.index = void 0;
var bcrypt_1 = require("bcrypt");
var dontenv_1 = require("../../../helps/dontenv");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var services_1 = require("./services");
var index = function (request, response) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = response).json;
            return [4 /*yield*/, (0, services_1.all)()];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); };
exports.index = index;
var store = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                data = request.validated;
                data.password = (0, bcrypt_1.hashSync)(data.password + (0, dontenv_1.env)("BCYPT_SECRET"), parseInt((0, dontenv_1.env)("BCYPT_SALT")));
                _b = (_a = response).json;
                return [4 /*yield*/, (0, services_1.save)(data)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); };
exports.store = store;
var show = function (request, response) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = response).json;
            return [4 /*yield*/, (0, services_1.one)(request.params.id)];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); };
exports.show = show;
var update = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                data = request.validated;
                if (data.password) {
                    data.password = (0, bcrypt_1.hashSync)(data.password + (0, dontenv_1.env)("bcypt_password"), parseInt((0, dontenv_1.env)("salt")));
                }
                else {
                    delete data.password;
                }
                _b = (_a = response).json;
                return [4 /*yield*/, (0, services_1.edit)(request.params.id, data)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); };
exports.update = update;
var destroy = function (request, response) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = response).json;
            return [4 /*yield*/, (0, services_1.remove)(request.params.id)];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); };
exports.destroy = destroy;
var sign_up = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b, _c, _d;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                data = request.validated;
                data.password = (0, bcrypt_1.hashSync)(data.password + (0, dontenv_1.env)("BCYPT_SECRET"), parseInt((0, dontenv_1.env)("salt")));
                _b = (_a = response).json;
                _e = {};
                _d = (_c = jsonwebtoken_1.default).sign;
                _f = {};
                return [4 /*yield*/, (0, services_1.save)(data)];
            case 1: return [2 /*return*/, _b.apply(_a, [(_e.token = _d.apply(_c, [(_f.id = (_g.sent()).id, _f), (0, dontenv_1.env)("TOKEN_SECRET"), {
                            expiresIn: "2h",
                        }]),
                        _e)])];
        }
    });
}); };
exports.sign_up = sign_up;
var sign_in = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var data, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = request.validated;
                return [4 /*yield*/, (0, services_1.find)("firstname", data.firstname)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, response.json({ errors: "user credential is worng" }).status(422)];
                }
                if (!(0, bcrypt_1.compareSync)(data.password + (0, dontenv_1.env)("BCYPT_SECRET"), user.password)) {
                    return [2 /*return*/, response.json({ errors: "user credential is worng" }).status(422)];
                }
                return [2 /*return*/, response.json({
                        token: jsonwebtoken_1.default.sign({ id: user.id }, (0, dontenv_1.env)("TOKEN_SECRET"), { expiresIn: "2h" }),
                    })];
        }
    });
}); };
exports.sign_in = sign_in;
