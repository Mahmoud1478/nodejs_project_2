import supertest from "supertest";
import App from "../../server";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../helps/dontenv";
import { User } from "../../models/user";

xdescribe("users endpoint", (): void => {
    const HttpRequest = supertest(App);
    let token: string;
    const user: User = {
        firstname: "user",
        lastname: "user",
        password: "123",
    };
    it("should't sign up if not provided any data", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({});
        expect(response.status).toBe(422);
    });
    it("sign up firstname is required", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({
            lastname: "user",
            password: "123",
        });
        expect(response.status).toBe(422);
    });

    it("sign up lastname is required", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({
            firstname: "user",
            password: "123",
        });
        expect(response.status).toBe(422);
    });

    it("sign up password is required", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({
            firstname: "user",
            lastname: "user",
        });
        expect(response.status).toBe(422);
    });

    it("user can sign up", async () => {
        const response = await HttpRequest.post("/users/sign-up").send(user);
        const { id } = Jwt.verify(response.body.token, env("TOKEN_SECRET") as string) as JwtPayload;
        user.id = id;
        expect(response.body.token).toBeTruthy();
    });

    it("sign up firstname is unique", async () => {
        const response = await HttpRequest.post("/users/sign-up").send(user);
        expect(response.status).toBe(422);
    });

    it("user can sign in", async () => {
        const response = await HttpRequest.post("/users/sign-in").send(user);
        token = response.body.token;
        expect(token).toBeTruthy();
    });
    it("sign in name is required", async () => {
        const response = await HttpRequest.post("/users/sign-in").send({
            password: "123",
        });
        expect(response.status).toBe(422);
    });

    it("sign in password is required", async () => {
        const response = await HttpRequest.post("/users/sign-in").send({
            firstname: "mahmoud",
        });
        expect(response.status).toBe(422);
    });
    it("unable to sign in if firstname or password is wrong", async () => {
        const response = await HttpRequest.post("/users/sign-in").send({
            firstname: "mahmoud",
            password: "worng",
        });
        expect(response.status).toBe(422);
    });
    it("list all users", async () => {
        const response = await HttpRequest.get("/users");
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("create user firstname is unique ", async () => {
        const response = await HttpRequest.post("/users").send(user);
        expect(response.status).toBe(422);
    });
    it("should't create user if not provided any data", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({});
        expect(response.status).toBe(422);
    });
    it("create user firstname is required", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({
            lastname: "user",
            password: "123",
        });
        expect(response.status).toBe(422);
    });

    it("create user lastname is required", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({
            firstname: "user",
            password: "123",
        });
        expect(response.status).toBe(422);
    });

    it("create user password is required", async () => {
        const response = await HttpRequest.post("/users/sign-up").send({
            firstname: "user",
            lastname: "user",
        });
        expect(response.status).toBe(422);
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
        expect(response.body[0].id).toEqual(user.id);
    });

    it("delete user", async () => {
        const response = await HttpRequest.delete("/users/" + user.id);
        expect(response.body[0].id).toEqual(user.id);
    });
});
