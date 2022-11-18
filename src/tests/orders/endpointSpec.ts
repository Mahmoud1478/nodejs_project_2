import supertest from "supertest";
import DB from "../../inc/db/DB";
import ProductModel, { Product } from "../../models/product";
import App from "../../server";
describe("orders endpoint", (): void => {
    const HttpRequest = supertest(App);
    let token: string;
    beforeAll(async () => {
        await DB.group(async (): Promise<void> => {
            await new ProductModel().create<Product>({
                name: "test",
                price: "123",
            });
            await new ProductModel().create<Product>({
                name: "test1",
                price: "123",
            });
        });
        const response = await HttpRequest.post("/users/sign-up").send({
            firstname: "order-test",
            lastname: "order-test",
            password: 123,
        });
        token = response.body.token;
    });

    it("closed orders can't be access without token", async (): Promise<void> => {
        const response = await HttpRequest.get("/orders");
        expect(response.status).toBe(401);
    });

    it("current order can't be access without token", async (): Promise<void> => {
        const response = await HttpRequest.get("/orders/current");
        expect(response.status).toBe(401);
    });

    it("create orders can't be access without token", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders");
        expect(response.status).toBe(401);
    });

    it("update order can't be access without token", async (): Promise<void> => {
        const response = await HttpRequest.put("/orders/1");
        expect(response.status).toBe(401);
    });
    it("create orders status required", async () => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                products: [
                    {
                        product_id: 1,
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("create orders status in (closed, current)", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "test",
                products: [
                    {
                        product_id: 1,
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("create orders products required", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "current",
            });
        expect(response.status).toBe(422);
    });
    it("create orders product_id required", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "current",
                products: [
                    {
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("create orders quantity required", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "current",
                products: [
                    {
                        product_id: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("create orders product_id esists in product table", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "current",
                products: [
                    {
                        product_id: 1000,
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("create orders product_id is integer", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "current",
                products: [
                    {
                        product_id: "aaaaaaa",
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("create orders quantity is integer", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "current",
                products: [
                    {
                        product_id: 1,
                        quantity: "abc",
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("create orders", async (): Promise<void> => {
        const response = await HttpRequest.post("/orders")
            .set("Authorization", "bearer " + token)
            .send({
                status: "current",
                products: [
                    {
                        product_id: 1,
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(200);
    });

    it("get current order", async (): Promise<void> => {
        const response = await HttpRequest.get("/orders/current").set(
            "Authorization",
            "bearer " + token
        );
        expect(response.status).toBe(200);
    });

    it("update orders", async (): Promise<void> => {
        const response = await HttpRequest.put("/orders/1")
            .set("Authorization", "bearer " + token)
            .send({
                status: "closed",
                products: [
                    {
                        product_id: 1,
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(200);
    });
    it("update orders status is required", async (): Promise<void> => {
        const response = await HttpRequest.put("/orders/1")
            .set("Authorization", "bearer " + token)
            .send({
                products: [
                    {
                        product_id: 1,
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("update orders status is in (closed,current)", async (): Promise<void> => {
        const response = await HttpRequest.put("/orders/1")
            .set("Authorization", "bearer " + token)
            .send({
                status: "test",
                products: [
                    {
                        product_id: 1,
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });
    it("update orders product_id is required", async (): Promise<void> => {
        const response = await HttpRequest.put("/orders/1")
            .set("Authorization", "bearer " + token)
            .send({
                status: "closed",
                products: [
                    {
                        quantity: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });

    it("update orders quantity is required", async (): Promise<void> => {
        const response = await HttpRequest.put("/orders/1")
            .set("Authorization", "bearer " + token)
            .send({
                status: "closed",
                products: [
                    {
                        product_id: 1,
                    },
                ],
            });
        expect(response.status).toBe(422);
    });

    it("get closed orders", async () => {
        const response = await HttpRequest.get("/orders").set("Authorization", "bearer " + token);
        expect(response.status).toBe(200);
    });
});
