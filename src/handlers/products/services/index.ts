import { Product } from "../../../models/product";
import { Request, Response } from "express";
import { all, edit, findByCategory, one, remove, save, status } from "./services";

export const index = async (request: Request, response: Response): Promise<Response> =>
    response.json(await all());

export const store = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as Product;
    return response.json(await save(data));
};

export const show = async (request: Request, response: Response): Promise<Response> =>
    response.json(await one(request.params.id));

export const update = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as Product;
    return response.json(await edit(request.params.id, data));
};

export const destroy = async (request: Request, response: Response): Promise<Response> =>
    response.json(await remove(request.params.id));

export const byCategoty = async (request: Request, response: Response): Promise<Response> =>
    response.json(await findByCategory(request.params.category));

export const top = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await status((request.query.limit ?? 5) as string));
};
