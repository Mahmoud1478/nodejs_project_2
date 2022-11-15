import supertest from "supertest";
import App from "../../server";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../helps/dontenv";
import { User } from "../../models/user";

describe("users endpoint", (): void => {
    const HttpRequest = supertest(App);
    const user: User = {
        firstname: "user",
        lastname: "user",
        password: "123",
    };

    it("user can sign up", async () => {
        const response = await HttpRequest.post("/users/sign-up").send(user);
        const { id } = Jwt.verify(response.body.token, env("TOKEN_SECRET") as string) as JwtPayload;
        user.id = id;
        expect(response.body.token).toBeTruthy();
    });

    it("user can sign in", async () => {
        const response = await HttpRequest.post("/users/sign-in").send(user);
        expect(response.body.token).toBeTruthy();
    });

    it("list all users", async () => {
        const response = await HttpRequest.get("/users");
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("show user", async () => {
        const response = await HttpRequest.get("/users/" + user.id);
        expect(response.body).toEqual({
            firstname: "user",
            lastname: "user",
            id: user.id,
        });
    });

    it("update user", async () => {
        const response = await HttpRequest.put("/users/" + user.id).send(user);
        expect(response.body.id).toEqual(user.id);
    });

    it("delete user", async () => {
        const response = await HttpRequest.delete("/users/" + user.id);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
