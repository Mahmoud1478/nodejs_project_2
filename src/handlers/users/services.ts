import UserModel, { User } from "../../models/users";
import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { env } from "../../helps/dontenv";
import Jwt from "jsonwebtoken";

export const index = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await new UserModel().select(["id", "firstname", "lastname"]).get<User>());
};

export const store = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as { [x: string]: string };
    data.password = hashSync(
        data.password + env("bcypt_password"),
        parseInt(env("salt") as string)
    );
    return response.json(await new UserModel().create<User>(data));
};

export const show = async (request: Request, response: Response): Promise<Response> => {
    return response.json(
        await new UserModel()
            .select(["id", "firstname", "lastname"])
            .find<User>("id", request.params.id as string)
    );
};

export const update = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as { [x: string]: string };
    if (data.password) {
        console.log("yes");
        data.password = hashSync(
            data.password + env("bcypt_password"),
            parseInt(env("salt") as string)
        );
    } else {
        delete data.password;
    }

    console.log(data);
    return response.json(
        await new UserModel().where("id", request.params.id as string).update<User>(data)
    );
};

export const destroy = async (request: Request, response: Response): Promise<Response> => {
    return response.json(
        await new UserModel().where("id", request.params.id as string).delete<User>()
    );
};

export const sign_up = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as { [x: string]: string };
    data.password = hashSync(
        data.password + env("bcybt_password"),
        parseInt(env("salt") as string)
    );

    return response.json({
        token: Jwt.sign(
            { id: (await new UserModel().create<User>(data)).id },
            env("TOKEN_SECRET") as string,
            { expiresIn: "2h" }
        ),
    });
};

export const sign_in = async (request: Request, response: Response): Promise<Response> => {
    const data = request.validated as { [x: string]: string };
    const user = await new UserModel().find<User>("firstname", data.firstname);
    if (!user || !compareSync(data.password + env("bcypt_password"), user.password)) {
        return response.json({ errors: "user credential is worng" }).status(422);
    }
    return response.json({
        token: Jwt.sign({ id: user.id }, env("TOKEN_SECRET") as string, { expiresIn: "2h" }),
    });
};
