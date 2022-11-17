import DB from "../inc/db/DB";
export type Product = {
    id?: number | string;
    name: string;
    price: number | string;
    category?: string;
};
class ProductModel extends DB {
    public constructor() {
        super("products");
    }
}
export default ProductModel;
