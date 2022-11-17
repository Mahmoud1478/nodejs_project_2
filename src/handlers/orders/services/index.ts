import OrderModel, { Order, OrderCreation } from "../../../models/order";
import { Request, Response } from "express";
import { save, all, one, edit } from "./services";

export const index = async (request: Request, response: Response): Promise<Response> =>
    response.json(await all(request.auth?.id as string));

export const store = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as OrderCreation;
    data.user_id = request.auth?.id;
    const [r, err] = await save(data);
    if (err) return response.sendStatus(500);

    return response.json(r);
};

export const current = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await one(request.auth?.id as string, "current"));
};
export const closed = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await one(request.auth?.id as string, "closed"));
};
// export const show = async (request: Request, response: Response): Promise<Response> =>
//     response.json(await one(request.params.id));

export const update = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as OrderCreation,
        order = await new OrderModel()
            .where("user_id", request.auth?.id as string)
            .find<Order>("id", request.params.id);
    if (!order) return response.sendStatus(404);
    const [r, err] = await edit(request.params.id, request.auth?.id as string, data);
    if (err) {
        console.error(err as Error);
        return response.sendStatus(500);
    }
    return response.json(r);
};
