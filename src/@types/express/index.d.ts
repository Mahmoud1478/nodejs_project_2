import { User } from "../../models/users";

declare global {
    declare namespace Express {
        export interface Request {
            validated?: { [x: string]: string };
            auth?: User | null;
            [x: string]: string | { [x: string]: string };
        }
    }
}
