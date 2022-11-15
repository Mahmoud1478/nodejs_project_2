import { User } from "../../models/user";

declare global {
    declare namespace Express {
        export interface Request extends Record<string, unknown> {
            validated?: Record<string, unknown>;
            auth?: User | null;
        }
    }
}
