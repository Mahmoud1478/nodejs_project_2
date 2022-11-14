import Model from "../inc/db/model";
export type Product = {
    id: number;
    name: string;
    price: number;
    category?: string;
};
class ProductModel extends Model {
    public constructor() {
        super("products");
    }
}
export default ProductModel;
