import Model from "../inc/db/model";
export type Product = {
    id?: number | string;
    name: string;
    price: number | string;
    category?: string;
};
class ProductModel extends Model {
    public constructor() {
        super("products");
    }
}
export default ProductModel;
