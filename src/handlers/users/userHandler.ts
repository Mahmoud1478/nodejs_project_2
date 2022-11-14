import { Application } from "express";
import auth from "../../middlewares/auth";
import Validation from "../../middlewares/validatorMw";
import rules from "./schema/rules";
import siginInRules from "./schema/sign_in";
import siginUpRules from "./schema/sign_up";
import { Delete, index, show, sign_in, sign_up, store, update } from "./services";

export default (App: Application) => {
    App.get("/users", [auth], index);
    App.post("/users", [Validation(rules)], store);
    App.put("/users/:id", [Validation(rules)], update);
    App.get("/users/:id", show);
    App.delete("/users/:id", Delete);
    App.post("/sign-in", [Validation(siginInRules)], sign_in);
    App.post("/sign-up", [Validation(siginUpRules)], sign_up);
};
