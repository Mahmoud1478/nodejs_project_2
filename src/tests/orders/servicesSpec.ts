import { save } from "../../handlers/orders/services/services";
import ProductModel, { Product } from "../../models/product";
import UserModel, { User } from "../../models/user";

describe("orders services", () => {
    it("save order with details", async () => {
        await new ProductModel().create<Product>({
            name: "test",
            price: "123",
        });
        await new UserModel().create<User>({
            firstname: "order-test",
            lastname: "tets",
            password: "123",
        });
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
    it("falid save order with details", async () => {
        const [value, err] = await save({
            user_id: "1",
            status: "one",
            products: [
                {
                    product_id: 0,
                    quantity: 5,
                },
            ],
        });
        expect(err).toBeTruthy();
    });
});
