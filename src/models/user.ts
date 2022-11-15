import Model from "../inc/db/model";

export type User = {
    id?: number | string;
    firstname: string;
    lastname: string;
    password?: string;
};

class UserModel extends Model {
    public constructor() {
        super("users");
    }
}

export default UserModel;
