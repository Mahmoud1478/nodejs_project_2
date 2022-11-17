import { save, edit, all, one } from "../../handlers/orders/services/services";
import { OrderFull } from "../../models/order";

describe("orders services", (): void => {
    it("save order with products and status current", async (): Promise<void> => {
        const [value] = await save({
            user_id: "1",
            status: "current",
            products: [
                {
                    product_id: 1,
                    quantity: 5,
                },
            ],
        });
        expect(value).toBeTruthy();
    });
    it("save order with products and status closed", async (): Promise<void> => {
        const [value] = await save({
            user_id: "1",
            status: "closed",
            products: [
                {
                    product_id: 1,
                    quantity: 5,
                },
            ],
        });
        expect(value).toBeTruthy();
    });
    it("falid saveing order with products when something wrong happened", async (): Promise<void> => {
        const value = await save({
            user_id: "1",
            status: "one",
            products: [
                {
                    product_id: 0,
                    quantity: 5,
                },
            ],
        });
        expect(value[1]).toBeTruthy();
    });

    it("update order with products", async (): Promise<void> => {
        const [value] = await edit("3", "1", {
            user_id: "1",
            status: "closed",
            products: [
                {
                    product_id: 2,
                    quantity: 5,
                },
            ],
        });
        expect((value as OrderFull).products[0].name).toEqual("test1");
    });

    it("list all products with status closed", async (): Promise<void> => {
        const value = await all("1");
        expect((value as OrderFull[]).length).toBeGreaterThan(0);
    });

    it("list current product", async (): Promise<void> => {
        const value = await one("1", "current");
        expect((value as OrderFull[])[0].status).toEqual("current");
    });
});
