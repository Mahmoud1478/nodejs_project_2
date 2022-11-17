import UserModel, { User } from "../../../models/user";

export const all = (): Promise<User[]> =>
    new UserModel().select(["id", "firstname", "lastname"]).get<User>();

export const one = (id: string): Promise<User | null> =>
    new UserModel().select(["id", "firstname", "lastname"]).find<User>("id", id);

export const save = (data: User): Promise<User> => new UserModel().create<User>(data);

export const remove = (id: string): Promise<User[]> =>
    new UserModel().where("id", id).delete<User>();

export const edit = (id: string, data: User): Promise<User[]> =>
    new UserModel().where("id", id).update<User>(data);

export const find = (column: string, value: string): Promise<User | null> =>
    new UserModel().find<User>(column, value);
