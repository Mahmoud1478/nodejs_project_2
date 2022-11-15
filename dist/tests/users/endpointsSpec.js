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
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dontenv_1 = require("../../helps/dontenv");
describe("users endpoint", function () {
    var HttpRequest = (0, supertest_1.default)(server_1.default);
    var user = {
        firstname: "user",
        lastname: "user",
        password: "123",
    };
    it("should't sign up if not provided any data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({})];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("sign up firstname is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({
                        lastname: "user",
                        password: "123",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("sign up lastname is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({
                        firstname: "user",
                        password: "123",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("sign up password is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({
                        firstname: "user",
                        lastname: "user",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("user can sign up", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send(user)];
                case 1:
                    response = _a.sent();
                    id = jsonwebtoken_1.default.verify(response.body.token, (0, dontenv_1.env)("TOKEN_SECRET")).id;
                    user.id = id;
                    expect(response.body.token).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("sign up firstname is unique", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("user can sign in", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-in").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.body.token).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("sign in name is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-in").send({
                        password: "123",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("sign in password is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-in").send({
                        firstname: "mahmoud",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("unable to sign in if firstname or password is wrong", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-in").send({
                        firstname: "mahmoud",
                        password: "worng",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("list all users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.get("/users")];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("create user firstname is unique ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should't create user if not provided any data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({})];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("create user firstname is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({
                        lastname: "user",
                        password: "123",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("create user lastname is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({
                        firstname: "user",
                        password: "123",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("create user password is required", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.post("/users/sign-up").send({
                        firstname: "user",
                        lastname: "user",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("show user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.get("/users/" + user.id)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toEqual({
                        firstname: "user",
                        lastname: "user",
                        id: user.id,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("update user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.put("/users/" + user.id).send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.body[0].id).toEqual(user.id);
                    return [2 /*return*/];
            }
        });
    }); });
    it("delete user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpRequest.delete("/users/" + user.id)];
                case 1:
                    response = _a.sent();
                    expect(response.body[0].id).toEqual(user.id);
                    return [2 /*return*/];
            }
        });
    }); });
});
