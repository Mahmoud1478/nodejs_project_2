"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RulesContainer_1 = __importDefault(require("./RulesContainer"));
var Validator = /** @class */ (function () {
    function Validator(request, response) {
        this.request = request;
        this.response = response;
        this.container = RulesContainer_1.default;
        this.bag = {};
    }
    // public async validate(schema: Schema): Promise<void> {
    //     Object.entries(schema).map((part) => {
    //         const location: string = part[0] as string;
    //         const prametars: object = part[1];
    //         Object.entries(prametars).map((part_) => {
    //             const lable: string = part_[0] as string;
    //             const rules = part_[1];
    //             rules.map((rule: string) => {
    //                 const value = (this.request as { [x: string]: string })[location][
    //                     lable as string
    //                 ] as string;
    //                 const ruleObjet = new this.container[rule](
    //                     this.request,
    //                     lable,
    //                     value
    //                 ) as InstanceType<Rule>;
    //             });
    //         });
    //     });
    // }
    Validator.prototype.fails = function () {
        return !!this.bag;
    };
    Validator.prototype.errors = function () {
        return this.bag;
    };
    return Validator;
}());
exports.default = Validator;
