import Model from "../inc/db/model";
export type Order = {
    id: number;
    user_id: number;
    status: string;
};
class OrderModel extends Model {
    public constructor() {
        super("orders");
    }
}
export default OrderModel;
