import { all, edit, findBy, one, remove, save } from "../../handlers/products/services/services";
import { Product } from "../../models/product";

xdescribe("products serives", (): void => {
    let product: Product;
    it("create product", async () => {
        product = await save({
            name: "product1",
            price: 150,
        });
        expect(product.id).toBeTruthy();
    });

    it("list all products", async () => {
        expect((await all()).length).toBeGreaterThan(0);
    });

    it("get one product", async () => {
        expect(await one(product.id as string)).toEqual(product);
    });

    it("find product by colmun", async () => {
        expect(await findBy("name", product.name)).toEqual(product);
    });

    it("update product", async () => {
        const updatedProducts = await edit(product.id as string, {
            ...product,
            category: "category",
        });

        expect(updatedProducts[0]).toEqual({
            ...product,
            category: "category",
        });
    });
    it("delete users", async () => {
        expect((await remove(product.id as string))[0]).toEqual({
            ...product,
            category: "category",
        });
    });
});
