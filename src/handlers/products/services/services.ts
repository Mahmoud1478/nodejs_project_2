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
