import Rule from "../core/classess/Role";

class RequiredRule extends Rule {
  public async validate(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default RequiredRule;
