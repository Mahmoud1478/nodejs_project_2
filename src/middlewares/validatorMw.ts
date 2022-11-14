import { NextFunction, Response, Request } from "express";
import Validator from "validatorjs";

const Validation =
    (rules: (req: Request) => { [x: string]: string }, vales = "body") =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const rulesObjet = rules(req);
        const validation = new Validator(req[vales], rulesObjet);
        return validation.checkAsync(
            () => {
                const data: { [x: string]: string } = {};
                Object.keys(rulesObjet).map((key) => {
                    data[key] = (req[vales] as { [x: string]: string })[key];
                    req.validated = data;
                });
                next();
            },
            () => res.status(422).json(validation.errors.errors)
        );
    };

export default Validation;
