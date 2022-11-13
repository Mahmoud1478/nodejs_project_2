import { NextFunction, Request, Response } from "express";
import rules from "./schema/rules";
import Validator from "validatorjs";
import { unique } from "../../inc/validation/rules";

export const testValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rulesObjet = rules(req.method, req.params.id);
  Validator.registerAsync(
    "unique",
    async (
      value: string | number | boolean,
      attribute: string,
      feild: string,
      passes
    ) => {
      let _passes = true;
      const prams = attribute.split(",") as [string, string, string?];
      const count = await unique(value as string, ...prams);
      if (count > 0) {
        _passes = false;
      }
      passes(_passes);
    },
    "this first name is aready exists"
  );
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
