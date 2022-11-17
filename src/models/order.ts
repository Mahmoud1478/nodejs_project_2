import DB from "../inc/db/DB";
import { Product } from "./product";
export type Order = {
    id?: number | string;
    user_id?: number | string;
    status: string;
};

export type Order_Product = {
    id?: string | number;
    order_id?: string | number;
    product_id: string | number;
    quantity: string | number;
};

export type OrderProduct = Product & {
    quantity: string | number;
};

export type OrderFull = Order & {
    products: OrderProduct[];
};
export type OrderCreation = Order & {
    products: Order_Product[];
};
class OrderModel extends DB {
    public constructor() {
        super("orders");
    }
}
export default OrderModel;
