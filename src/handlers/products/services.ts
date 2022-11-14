import ProductModel, { Product } from "../../models/product";
import { Request, Response } from "express";

export const index = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await new ProductModel().select().get<Product>());
};

export const store = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as { [x: string]: string };
    return response.json(await new ProductModel().create<Product>(data));
};

export const show = async (request: Request, response: Response): Promise<Response> => {
    return response.json(
        await new ProductModel().select().find<Product>("id", request.params.id as string)
    );
};

export const update = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as { [x: string]: string };

    return response.json(
        await new ProductModel().where("id", request.params.id as string).update<Product>(data)
    );
};

export const destroy = async (request: Request, response: Response): Promise<Response> => {
    return response.json(
        await new ProductModel().where("id", request.params.id as string).delete<Product>()
    );
};
export const byCategoty = async (request: Request, response: Response): Promise<Response> => {
    return response.json(
        await new ProductModel().where("category", request.params.category as string).get<Product>()
    );
};
