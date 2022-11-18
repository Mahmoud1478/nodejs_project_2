import continer, { Rule } from "./customRules";
import Validator from "validatorjs";

export default () => {
    continer.map((rule: Rule): void => {
        if (rule.type === "async") {
            Validator.registerAsync(rule.name, rule.callback, rule.errorMessage);
        } else {
            Validator.register(rule.name, rule.callback, rule.errorMessage);
        }
    });
};
