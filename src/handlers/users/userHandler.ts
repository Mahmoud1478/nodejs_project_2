import { Application } from "express";
import auth from "../../middlewares/auth";
import Validation from "../../middlewares/validatorMw";
import rules from "./rules";
import siginInRules from "./rules/sign_in";
import { destroy, index, show, sign_in, sign_up, store, update } from "./services";

export default (App: Application): void => {
    App.get("/users", [auth], index);
    App.post("/users", [auth, Validation(rules)], store);
    App.put("/users/:id", [auth, Validation(rules)], update);
    App.get("/users/:id", auth, show);
    App.delete("/users/:id", auth, destroy);
    App.post("/users/sign-in", [Validation(siginInRules)], sign_in);
    App.post("/users/sign-up", [Validation(rules)], sign_up);
};
