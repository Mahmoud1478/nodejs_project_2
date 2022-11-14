import { Application } from "express";
import Validation from "../../middlewares/validatorMw";
import rules from "./schema/rules";
import siginInRules from "./schema/sign_in";
import siginUpRules from "./schema/sign_up";
import { destroy, index, show, sign_in, sign_up, store, update } from "./services";

export default (App: Application) => {
    App.get("/users", index);
    App.post("/users", [Validation(rules)], store);
    App.put("/users/:id", [Validation(rules)], update);
    App.get("/users/:id", show);
    App.delete("/users/:id", destroy);
    App.post("/sign-in", [Validation(siginInRules)], sign_in);
    App.post("/sign-up", [Validation(siginUpRules)], sign_up);
};
