import { NextFunction, Response, Request } from "express";
import Validator from "validatorjs";

const Validation =
    (rules: (req: Request) => Record<string, string>, values = "body") =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const rulesObjet = rules(req);
        const validation = new Validator(req[values], rulesObjet);
        return validation.checkAsync(
            () => {
                const data = {} as Record<string, string>;
                Object.keys(rulesObjet).map((key) => {
                    const value = (req[values] as { [x: string]: string })[key];
                    if (value) {
                        data[key] = (req[values] as Record<string, string>)[key];
                    }
                });
                req.validated = data;
                next();
            },
            () => res.status(422).json(validation.errors.errors)
        );
    };

export default Validation;
