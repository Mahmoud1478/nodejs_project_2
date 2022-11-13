import { Application, Request, Response } from "express";
import Validation from "../../middlewares/validatorMw";
import User, { TUser } from "../../models/users";
import rules from "./schema/rules";

const index = async (req: Request, res: Response): Promise<Response> => {
  return res.json(await new User().get<TUser>());
};

const store = async (req: Request, res: Response): Promise<void> => {
  res.json(await new User().create<TUser>((req as any).validated));
};

export default (App: Application) => {
  App.get("/users", index);
  App.post("/users", [Validation(rules)], store);
};
