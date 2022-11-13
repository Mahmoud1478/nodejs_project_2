import { Request } from "express";

abstract class Rule {
  private errors: string | undefined;
  public constructor(
    private readonly request: Request,
    private readonly lable: string,
    private readonly value: string
  ) {}

  public abstract validate(): Promise<void>;

  public fails(): boolean {
    return !!this.errors;
  }

  public getErrors(): string | undefined {
    return this.errors;
  }
}

export default Rule;
