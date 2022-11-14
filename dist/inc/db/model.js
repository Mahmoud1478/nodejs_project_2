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
exports.__esModule = true;
var database_1 = __importDefault(require("../../database"));
var sql_1 = __importDefault(require("./sql"));
var Model = /** @class */ (function () {
    function Model() {
        this.wheres = [];
        this.joins = [];
        this.table = this.constructor.name + "s";
        this.query = sql_1["default"].select(this.table, "*");
        this.values = [];
    }
    Model.prototype.select = function (colums) {
        if (colums === void 0) { colums = ["*"]; }
        this.query = sql_1["default"].select(this.table, colums.toString());
        return this;
    };
    Model.prototype.update = function (columns) {
        return __awaiter(this, void 0, void 0, function () {
            var modColums, valuesLen, column, conn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modColums = [];
                        valuesLen = this.values.length + 1;
                        for (column in columns) {
                            modColums.push("".concat(column, " = ($").concat(valuesLen, ")"));
                            this.values.push(columns[column]);
                            valuesLen++;
                        }
                        this.query = sql_1["default"].update(this.table, modColums.toString());
                        this.build();
                        return [4 /*yield*/, (0, database_1["default"])()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(this.query + " RETURNING *", this.values)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    Model.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.query = sql_1["default"]["delete"](this.table);
                        this.build();
                        return [4 /*yield*/, (0, database_1["default"])()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(this.query + " RETURNING *", this.values)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                }
            });
        });
    };
    Model.prototype.create = function (columns) {
        return __awaiter(this, void 0, void 0, function () {
            var values, conn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = [];
                        Object.keys(columns).forEach(function (item, index) {
                            values.push("$".concat(index + 1));
                        });
                        return [4 /*yield*/, (0, database_1["default"])()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql_1["default"].insert(this.table, Object.keys(columns).toString(), values.toString()), Object.values(columns))];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    Model.prototype.where = function (colum, value, operator) {
        if (operator === void 0) { operator = "="; }
        this.wheres.push([colum, operator, "($".concat(this.values.length + 1, ")")]);
        this.values.push(value);
        return this;
    };
    Model.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.build();
                        return [4 /*yield*/, (0, database_1["default"])()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(this.query, this.values)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                }
            });
        });
    };
    Model.prototype.build = function () {
        var _this = this;
        sql_1["default"].arrangement.forEach(function (item) {
            _this.query += _this.handle_statement(item);
        });
    };
    Model.prototype.handle_statement = function (statement) {
        var _this = this;
        var map = {
            wheres: function () {
                if (_this.wheres.length) {
                    var result_1 = [];
                    _this.wheres.forEach(function (item) {
                        result_1.push(item.join(" "));
                    });
                    return sql_1["default"].where(result_1.join(" AND "));
                }
                return "";
            },
            joins: function () { return _this.joins.join(" "); }
        };
        return map[statement]();
    };
    return Model;
}());
exports["default"] = Model;
