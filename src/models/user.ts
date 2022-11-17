import DB from "../inc/db/DB";

export type User = {
    id?: number | string;
    firstname: string;
    lastname: string;
    password?: string;
};

class UserModel extends DB {
    public constructor() {
        super("users");
    }
}

export default UserModel;
