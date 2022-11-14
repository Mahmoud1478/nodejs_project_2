import Rule from "../core/classess/Role";

class UniqueRule extends Rule {
    public validate(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default UniqueRule;
