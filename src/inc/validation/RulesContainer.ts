import { RulesCointainer } from "./core/types";
import RequiredRule from "./rules/RequiredRule";
import UniqueRule from "./rules/UniqueRule";

const container: RulesCointainer = {
    required: RequiredRule,
    unique: UniqueRule,
};
export default container;
