import { Application } from "express";
import auth from "../../middlewares/auth";
import Validation from "../../middlewares/validatorMw";
import rules from "./rules/rules";
import { index, store, current, update } from "./services";

export default (App: Application): void => {
    App.get("/orders", auth, index);
    App.post("/orders", [auth, Validation(rules)], store);
    App.get("/orders/current", auth, current);
    App.put("/orders/:id", [auth, Validation(rules)], update);
};
