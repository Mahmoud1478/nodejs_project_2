import { Application } from "express";
import auth from "../../middlewares/auth";
import Validation from "../../middlewares/validatorMw";
import rules from "./rules/rules";
import { index, store, current, closed, update } from "./services";

export default (App: Application) => {
    App.get("/orders", auth, index);
    App.post("/orders", [auth, Validation(rules)], store);
    App.get("/orders/current", auth, current);
    App.get("/orders/closed", auth, closed);
    App.put("/orders/:id", [auth, Validation(rules)], update);
};
