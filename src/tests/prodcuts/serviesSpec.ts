import {
    all,
    edit,
    findBy,
    one,
    remove,
    save,
    status,
} from "../../handlers/products/services/services";
import { Product } from "../../models/product";

describe("products services", (): void => {
    let product: Product;
    it("create product", async (): Promise<void> => {
        product = await save({
            name: "product1",
            price: 150,
        });
        expect(product.id).toBeTruthy();
    });

    it("list all products", async (): Promise<void> => {
        expect((await all()).length).toBeGreaterThan(0);
    });

    it("get one product", async (): Promise<void> => {
        expect(await one(product.id as string)).toEqual(product);
    });

    it("find product by colmun", async (): Promise<void> => {
        expect(await findBy("name", product.name)).toEqual(product);
    });

    it("update product", async (): Promise<void> => {
        const updatedProducts = await edit(product.id as string, {
            ...product,
            category: "category",
        });
        expect(updatedProducts[0]).toEqual({
            ...product,
            category: "category",
        });
    });
    it("list top five ", async () => {
        const r = await status("5");
        expect(r.length).toBeGreaterThan(0);
    });
    it("delete users", async (): Promise<void> => {
        expect((await remove(product.id as string))[0]).toEqual({
            ...product,
            category: "category",
        });
    });
});
