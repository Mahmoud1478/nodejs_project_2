import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../helps/dontenv";
import UserModel, { User } from "../models/user";
const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = (req.headers.authorization as string).split(" ")[1];
        const payload = Jwt.verify(token, env("TOKEN_SECRET") as string) as JwtPayload;
        const user = await new UserModel().find<User>("id", payload.id);
        if (!user) {
            res.status(401).json({ error: "Unauthenticated" });
        }
        req.auth = user;
        next();
    } catch (error) {
        if ((error as Error).message === "jwt must be provided") {
            res.status(401).json({ error: "Unauthenticated" });
            return;
        }
        throw error;
    }
};

export default auth;
