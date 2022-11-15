import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { env } from "../../../helps/dontenv";
import Jwt from "jsonwebtoken";
import { all, edit, one, find, remove, save } from "./services";
import { User } from "../../../models/user";

export const index = async (request: Request, response: Response): Promise<Response> =>
    response.json(await all());

export const store = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as User;
    data.password = hashSync(
        (data.password as string) + env("BCYPT_SECRET"),
        parseInt(env("BCYPT_SALT") as string)
    );
    return response.json(await save(data));
};

export const show = async (request: Request, response: Response): Promise<Response> =>
    response.json(await one(request.params.id as string));

export const update = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as User;
    if (data.password) {
        data.password = hashSync(
            data.password + env("bcypt_password"),
            parseInt(env("salt") as string)
        );
    } else {
        delete data.password;
    }
    return response.json(await edit(request.params.id, data));
};

export const destroy = async (request: Request, response: Response): Promise<Response> =>
    response.json(await remove(request.params.id));

export const sign_up = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as User;
    data.password = hashSync(
        (data.password as string) + env("BCYPT_SECRET"),
        parseInt(env("salt") as string)
    );

    return response.json({
        token: Jwt.sign({ id: (await save(data)).id }, env("TOKEN_SECRET") as string, {
            expiresIn: "2h",
        }),
    });
};

export const sign_in = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as { [x: string]: string };
    const user = await find("firstname", data.firstname);
    if (!user) {
        return response.json({ errors: "user credential is worng" }).status(422);
    }

    if (!compareSync(data.password + env("BCYPT_SECRET"), user.password as string)) {
        return response.json({ errors: "user credential is worng" }).status(422);
    }
    return response.json({
        token: Jwt.sign({ id: user.id }, env("TOKEN_SECRET") as string, { expiresIn: "2h" }),
    });
};
