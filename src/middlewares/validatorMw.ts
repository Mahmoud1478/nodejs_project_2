import { NextFunction, Request, Response } from "express";

import Validator from "validatorjs";
// import rules from "../handlers/users/schema/rules";
import continer, { Rule } from "./custumRules";

const Validation = (rules: (req: Request) => { [x: string]: string }) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const rulesObjet = rules(req);
    continer.map((rule: Rule) => {
      if (rule.type === "async") {
        Validator.registerAsync(rule.name, rule.callback, rule.errorMessage);
      } else {
        Validator.register(rule.name, rule.callback, rule.errorMessage);
      }
    });

    const validation = new Validator(req.body, rulesObjet);
    return validation.checkAsync(
      () => {
        const data: { [x: string]: string } = {};
        Object.keys(rulesObjet).map((key) => {
          data[key] = req.body[key];
          (req as any).validated = data;
        });
        next();
      },
      () => res.status(422).json(validation.errors)
    );
  };
};
export default Validation;
