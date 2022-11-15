import { User } from "../../models/user";

declare global {
    declare namespace Express {
        export interface Request {
            validated?: Record<string, unknown>;
            auth?: User | null;
            [x: string]: string | { [x: string]: string };
        }
    }
}
