import supertest from "supertest";
import App from "../../server";
import { Product } from "../../models/product";

describe("products endpoint", (): void => {
    const HttpRequest = supertest(App);
    let product: Product = {
        name: "product endpoint",
        price: 250,
    };
    let token: string;
    beforeAll(async (): Promise<void> => {
        const response = await HttpRequest.post("/users/sign-up").send({
            firstname: "product-test",
            lastname: "product-test",
            password: 123,
        });
        token = response.body.token;
    });

    it("should't create if not provided any data", async (): Promise<void> => {
        const response = await HttpRequest.post("/products")
            .send({})
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(422);
    });

    it("name is required", async (): Promise<void> => {
        const response = await HttpRequest.post("/products")
            .set("Authorization", "bearer " + token)
            .send({
                price: 500,
                category: "test",
            });
        expect(response.status).toBe(422);
    });
    it("price is required", async (): Promise<void> => {
        const response = await HttpRequest.post("/products")
            .set("Authorization", "bearer " + token)
            .send({
                name: "testing",
                category: "test",
            });
        expect(response.status).toBe(422);
    });
    it("price is numeric", async (): Promise<void> => {
        const response = await HttpRequest.post("/products")
            .set("Authorization", "bearer " + token)
            .send({
                name: "testing",
                price: "abc",
                category: "test",
            });
        expect(response.status).toBe(422);
    });

    it("can't create product without token", async (): Promise<void> => {
        const response = await HttpRequest.post("/products").send(product);
        expect(response.status).toBe(401);
    });
    it("create product", async (): Promise<void> => {
        const response = await HttpRequest.post("/products")
            .set("Authorization", "bearer " + token)
            .send(product);
        product = response.body;
        expect(product.id).toBeTruthy();
    });

    it("name is unique", async (): Promise<void> => {
        const response = await HttpRequest.post("/products")
            .send(product)
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(422);
    });

    it("list all products", async (): Promise<void> => {
        const response = await HttpRequest.get("/products");
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("show product", async (): Promise<void> => {
        const response = await HttpRequest.get("/products/" + product.id);
        expect(response.body).toEqual(product);
    });

    it("update product name is required", async (): Promise<void> => {
        const response = await HttpRequest.put("/products/" + product.id)
            .set("Authorization", "bearer " + token)
            .send({
                price: "123",
                category: "test",
            });
        expect(response.status).toBe(422);
    });

    it("update product price is required", async (): Promise<void> => {
        const response = await HttpRequest.put("/products/" + product.id)
            .set("Authorization", "bearer " + token)
            .send({
                name: "testing",
                category: "test",
            });
        expect(response.status).toBe(422);
    });

    it("update product price is numeric", async (): Promise<void> => {
        const response = await HttpRequest.put("/products/" + product.id)
            .set("Authorization", "bearer " + token)
            .send({
                name: "testing",
                price: "abc",
                category: "test",
            });
        expect(response.status).toBe(422);
    });

    it("can't update product without token", async (): Promise<void> => {
        const response = await HttpRequest.put("/products/" + product.id).send({
            ...product,
            category: "test",
        });
        expect(response.status).toEqual(401);
    });

    it("update product", async (): Promise<void> => {
        const response = await HttpRequest.put("/products/" + product.id)
            .send({
                ...product,
                category: "test",
            })
            .set("Authorization", "bearer " + token);
        expect(response.body[0]).toEqual({
            ...product,
            category: "test",
        });
    });
    it("get product by category", async (): Promise<void> => {
        const response = await HttpRequest.get("/products/test/category");
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("get top five ", async (): Promise<void> => {
        const response = await HttpRequest.get("/products/top");
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("delete product", async (): Promise<void> => {
        const response = await HttpRequest.delete("/products/" + product.id);
        expect(response.body[0]).toEqual({
            ...product,
            category: "test",
        });
    });
});
