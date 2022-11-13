import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import userHandler from "./handlers/users/userHandler";
const App: Application = express();
const port = 3000;

App.listen(port, () => {
  console.log(`\nApplication started in http://localhost:${port}`);
  dotenv.config();
});

App.use(bodyParser.json());

App.get("/", (request: Request, response: Response): void => {
  response.send("welcome ");
});

userHandler(App);
export default App;
