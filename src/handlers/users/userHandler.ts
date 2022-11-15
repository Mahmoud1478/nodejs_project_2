import { Application } from "express";
import Validation from "../../middlewares/validatorMw";
import rules from "./rules";
import siginInRules from "./rules/sign_in";
import { destroy, index, show, sign_in, sign_up, store, update } from "./servies";

export default (App: Application) => {
    App.get("/users", index);
    App.post("/users", [Validation(rules)], store);
    App.put("/users/:id", [Validation(rules)], update);
    App.get("/users/:id", show);
    App.delete("/users/:id", destroy);
    App.post("/users/sign-in", [Validation(siginInRules)], sign_in);
    App.post("/users/sign-up", [Validation(rules)], sign_up);
};
