import DB from "../../../inc/db/DB";
import OrderModel, {
    Order,
    OrderFull,
    OrderCreation,
    Order_Product,
    OrderProduct,
} from "../../../models/order";
import ProductModel from "../../../models/product";

const query = `select orders.id , orders.status , (
    select array_to_json(array_agg(row_to_json(object)))  from (
        select products.* ,order_product.quantity from order_product
        join products on products.id = order_product.product_id
        where order_product.order_id = orders.id
    ) as object
)as products 
from orders where orders.status = ($2) and orders.user_id = ($1)`;

export const all = async (user_id: string, status = "closed") =>
    OrderModel.selectRaw(query, [user_id, status]);

export const one = async (id: string, status: string): Promise<Order | Order[] | null> => {
    return DB.selectRaw<Order>(query, [id, status]);
};
export const save = async (data: OrderCreation) => {
    return DB.transcaction<OrderFull>(async (): Promise<OrderFull> => {
        const { user_id, status } = data;
        const order = await new OrderModel().create<Order>({
            user_id,
            status,
        });
        const order_product = new DB("order_product");
        for (let i = 0; i < data.products.length; i++) {
            const item = data.products[i];
            await order_product.create<Order_Product>({
                ...item,
                order_id: (order as unknown as Order).id,
            });
        }
        const order_product_map: Record<string | number, string | number> = {};
        data.products.forEach((item) => {
            order_product_map[item.product_id] = item.quantity;
        });
        const products = await new ProductModel()
            .whereIn("id", Object.keys(order_product_map))
            .get<OrderProduct>();
        return {
            id: order.id,
            status: order.status,
            products: products.map((item) => {
                item.quantity = order_product_map[item.id as string];
                return item;
            }),
        };
    });
};

// export const remove = (id: string): Promise<Product[]> =>
//     new ProductModel().where("id", id).delete<Product>();

export const edit = async (id: string, user_id: string, data: OrderCreation) =>
    DB.transcaction<OrderFull>(async (): Promise<OrderFull | null | OrderFull[]> => {
        const orders = await new OrderModel().where("id", id).update<Order>({
            status: data.status,
        });
        if (data.products?.length) {
            const order_product = new DB("order_product"),
                currentProducts = await order_product.where("order_id", id).get<Order_Product>(),
                currentProducts_ids = currentProducts.map((product) =>
                    parseInt(product.product_id as string)
                ),
                newPoducts_ids = data.products.map((product) =>
                    parseInt(product.product_id as string)
                ),
                deletedProduct = currentProducts_ids.filter((x) => !newPoducts_ids.includes(x));
            if (deletedProduct.length) {
                await order_product
                    .where("order_id", orders[0].id as string)
                    .whereIn("product_id", deletedProduct)
                    .delete();
            }

            for (let i = 0; i < data.products.length; i++) {
                const product = data.products[i];
                if (currentProducts_ids.includes(parseInt(product.product_id as string))) {
                    await order_product
                        .where("order_id", orders[0].id as string)
                        .where("product_id", product.product_id)
                        .update({ quantity: product.quantity });
                } else {
                    await order_product.create<Order_Product>({
                        ...product,
                        order_id: orders[0].id,
                    });
                }
            }
        }
        return {
            id: orders[0].id,
            status: orders[0].status,
            products: await new DB("order_product")
                .select(["products.*", "order_product.quantity"])
                .where("order_product.order_id", orders[0].id as string)
                .join("products", "products.id", "order_product.product_id")
                .get<OrderProduct>(),
        };
    });

// export const findBy = (column: string, value: string): Promise<Product | null> =>
//     new ProductModel().find<Product>(column, value);

// export const findByCategory = (category: string): Promise<Product[]> =>
//     new ProductModel().where("category", category).get<Product>();
