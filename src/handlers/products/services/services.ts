import DB from "../../../inc/db/DB";
import ProductModel, { Product } from "../../../models/product";

export const all = (): Promise<Product[]> => new ProductModel().get<Product>();

export const one = (id: string): Promise<Product | null> =>
    new ProductModel().find<Product>("id", id);

export const save = (data: Product): Promise<Product> => new ProductModel().create<Product>(data);

export const remove = (id: string): Promise<Product[]> =>
    new ProductModel().where("id", id).delete<Product>();

export const edit = (id: string, data: Product): Promise<Product[]> =>
    new ProductModel().where("id", id).update<Product>(data);

export const findBy = (column: string, value: string): Promise<Product | null> =>
    new ProductModel().find<Product>(column, value);

export const findByCategory = (category: string): Promise<Product[]> =>
    new ProductModel().where("category", category).get<Product>();

export const status = (limit: string): Promise<{ quantity: number; name: string }[]> =>
    new DB("order_product")
        .select(["products.name", "sum(quantity) as quantity"])
        .join("products", "products.id", "order_product.product_id")
        .groupBy(["product_id ", "products.name"])
        .orderBy("quantity", "DESC")
        .limit(limit as unknown as number)
        .get<{ quantity: number; name: string }>();
