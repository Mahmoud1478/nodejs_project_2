import { Application } from "express";
import auth from "../../middlewares/auth";
import Validation from "../../middlewares/validatorMw";
import rules from "./rules/rules";
import { byCategoty, destroy, index, show, store, top, update } from "./services";

export default (App: Application) => {
    App.get("/products", index);
    App.get("/products/top", top);
    App.post("/products", [auth, Validation(rules)], store);
    App.put("/products/:id", [auth, Validation(rules)], update);
    App.get("/products/:id", show);
    App.get("/products/:category/category", byCategoty);
    App.delete("/products/:id", destroy);
};
