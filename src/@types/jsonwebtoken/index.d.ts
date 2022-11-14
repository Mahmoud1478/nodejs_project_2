declare global {
    declare namespace Jwt {
        export interface JwtPayload {
            id: string;
        }
    }
}
