import { Application } from "express";
import Validation from "../../middlewares/validatorMw";
import rules from "./rules/rules";
import { byCategoty, destroy, index, show, store, update } from "./services";

export default (App: Application) => {
    App.get("/products", index);
    App.post("/products", [Validation(rules)], store);
    App.put("/products/:id", [Validation(rules)], update);
    App.get("/products/:id", show);
    App.get("/products/:category/category", byCategoty);
    App.delete("/products/:id", destroy);
};
