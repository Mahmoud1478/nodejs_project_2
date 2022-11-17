import supertest from "supertest";
import App from "../../server";
import { Product } from "../../models/product";

xdescribe("products endpoint", (): void => {
    const HttpRequest = supertest(App);
    let product: Product = {
        name: "product endpoint",
        price: 250,
    };
    it("should't create if not provided any data", async () => {
        const response = await HttpRequest.post("/products").send({});
        expect(response.status).toBe(422);
    });

    it("name is required", async () => {
        const response = await HttpRequest.post("/products").send({
            price: 500,
            category: "test",
        });
        expect(response.status).toBe(422);
    });
    it("price is required", async () => {
        const response = await HttpRequest.post("/products").send({
            name: "testing",
            category: "test",
        });
        expect(response.status).toBe(422);
    });
    it("price is numeric", async () => {
        const response = await HttpRequest.post("/products").send({
            name: "testing",
            price: "abc",
            category: "test",
        });
        expect(response.status).toBe(422);
    });

    it("create product", async () => {
        const response = await HttpRequest.post("/products").send(product);
        product = response.body;
        expect(product.id).toBeTruthy();
    });

    it("name is unique", async () => {
        const response = await HttpRequest.post("/products").send(product);
        expect(response.status).toBe(422);
    });

    it("list all products", async () => {
        const response = await HttpRequest.get("/products");
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("show product", async () => {
        const response = await HttpRequest.get("/products/" + product.id);
        expect(response.body).toEqual(product);
    });

    it("update product name is required", async () => {
        const response = await HttpRequest.put("/products/" + product.id).send({
            price: "123",
            category: "test",
        });
        expect(response.status).toBe(422);
    });

    it("update product price is required", async () => {
        const response = await HttpRequest.put("/products/" + product.id).send({
            name: "testing",
            category: "test",
        });
        expect(response.status).toBe(422);
    });

    it("update product price is numeric", async () => {
        const response = await HttpRequest.put("/products/" + product.id).send({
            name: "testing",
            price: "abc",
            category: "test",
        });
        expect(response.status).toBe(422);
    });

    it("update product", async () => {
        const response = await HttpRequest.put("/products/" + product.id).send({
            ...product,
            category: "test",
        });
        expect(response.body[0]).toEqual({
            ...product,
            category: "test",
        });
    });

    it("get product by category", async () => {
        const response = await HttpRequest.get("/products/test/category");
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("delete product", async () => {
        const response = await HttpRequest.delete("/products/" + product.id);
        expect(response.body[0]).toEqual({
            ...product,
            category: "test",
        });
    });
});
