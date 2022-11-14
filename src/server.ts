import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import userHandler from "./handlers/users/userHandler";
import productHandler from "./handlers/products/productHandler";
import validattorInit from "./init/validation";
const App: Application = express();
const port = 3000;

App.listen(port, () => {
    console.log(`\nApplication started in http://localhost:${port}`);
    validattorInit();
});

App.use(bodyParser.json());

App.get("/", (request: Request, response: Response): void => {
    response.send("welcome ");
});

userHandler(App);
productHandler(App);
export default App;
