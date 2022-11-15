import { all, edit, find, one, remove, save } from "../../handlers/users/servies/services";
import { User } from "../../models/user";

describe("users serives", (): void => {
    let id: number | undefined | string;
    let user: User;
    it("create user", async () => {
        user = await save({
            firstname: "test",
            lastname: "test",
            password: "test",
        });
        id = user.id;
        expect(user).toBeTruthy();
    });

    it("list all users", async () => {
        expect(await all()).toBeTruthy();
    });

    it("get one user", async () => {
        expect(await one(id as unknown as string)).toBeTruthy();
    });

    it("find user by colmun", async () => {
        expect(await find("id", id as unknown as string)).toBeTruthy();
    });

    it("update user", async () => {
        expect(await edit(id as unknown as string, user as { [x: string]: string })).toBeTruthy();
    });

    it("delete users", async () => {
        expect((await remove(id as unknown as string)).length).toBeGreaterThan(0);
    });
});
