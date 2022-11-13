import Model from "../inc/db/model";

export type TUser = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

class User extends Model {
  protected table = "users";
}

export default User;
