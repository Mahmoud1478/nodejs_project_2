import { all, edit, find, one, remove, save } from "../../handlers/users/services/services";
import { User } from "../../models/user";

describe("users serives", (): void => {
    let user: User;
    it("create user", async () => {
        user = await save({
            firstname: "test",
            lastname: "test",
            password: "test",
        });
        expect(user.id).toBeTruthy();
    });

    it("list all users", async () => {
        expect((await all()).length).toBeGreaterThan(0);
    });

    it("get one user", async () => {
        expect(await one(user.id as string)).toBeTruthy();
    });

    it("find user by colmun", async () => {
        expect(await find("id", user.id as string)).toBeTruthy();
    });

    it("update user", async () => {
        expect(
            (
                await edit(user.id as string, {
                    ...user,
                    lastname: "test2",
                })
            )[0]
        ).toEqual({
            ...user,
            lastname: "test2",
        });
    });

    it("delete users", async () => {
        expect((await remove(user.id as string))[0]).toEqual({
            ...user,
            lastname: "test2",
        });
    });
});
