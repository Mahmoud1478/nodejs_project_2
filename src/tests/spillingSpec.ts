import DB from "../inc/db/DB";

describe("spilling", (): void => {
    describe("select statement", (): void => {
        it("simple without columns", (): void => {
            expect(new DB("testing").toSql().toLowerCase()).toEqual("select * from testing");
        });
        it("simple with columns", (): void => {
            expect(new DB("testing").select(["name", "password"]).toSql().toLowerCase()).toEqual(
                "select name,password from testing"
            );
        });
    });
    describe("delete statement", (): void => {
        it("delete", (): void => {
            expect(new DB("testing").setCommand("delete").toSql().toLowerCase()).toEqual(
                "delete from testing"
            );
        });
    });
    describe("where statement", (): void => {
        it("simple ", (): void => {
            expect(new DB("testing").where("name", "mahmoud").toSql().toLowerCase()).toEqual(
                "select * from testing where name = ($1)"
            );
        });
        it("simple  with multiable colums", (): void => {
            expect(
                new DB("testing").where("name", "mahmoud").where("id", "1").toSql().toLowerCase()
            ).toEqual("select * from testing where name = ($1) and id = ($2)");
        });
        it("simple  with op in", (): void => {
            expect(new DB("testing").whereIn("id", [1, 2, 3, 4]).toSql().toLowerCase()).toEqual(
                "select * from testing where id in (($1),($2),($3),($4))"
            );
        });
    });
    describe("or statement", (): void => {
        it("simple ", (): void => {
            expect(
                new DB("testing").where("name", "mahmoud").orWhere("id", "1").toSql().toLowerCase()
            ).toEqual("select * from testing where name = ($1) or id = ($2)");
        });
        it("simple with multiable colums", (): void => {
            expect(
                new DB("testing")
                    .where("name", "mahmoud")
                    .orWhere("id", "1")
                    .orWhere("lastname", "test")
                    .toSql()
                    .toLowerCase()
            ).toEqual("select * from testing where name = ($1) or id = ($2) or lastname = ($3)");
        });
    });
    describe("limit statement", (): void => {
        it("limit statement", (): void => {
            expect(
                new DB("testing")
                    .where("name", "mahmoud")
                    .orWhere("id", "1")
                    .limit(10)
                    .toSql()
                    .toLowerCase()
            ).toEqual("select * from testing where name = ($1) or id = ($2) limit 10");
        });
    });
    describe("offest statement", (): void => {
        it("offest statement", (): void => {
            expect(
                new DB("testing")
                    .where("name", "mahmoud")
                    .orWhere("id", "1")
                    .limit(10)
                    .offset(10)
                    .toSql()
                    .toLowerCase()
            ).toEqual("select * from testing where name = ($1) or id = ($2) offset 10 limit 10");
        });
    });
    describe("order by statement", (): void => {
        it("order by statement", (): void => {
            expect(
                new DB("testing")
                    .where("name", "mahmoud")
                    .orWhere("id", "1")
                    .limit(10)
                    .offset(10)
                    .orderBy("id")
                    .toSql()
                    .toLowerCase()
            ).toEqual(
                "select * from testing where name = ($1) or id = ($2) order by id asc offset 10 limit 10"
            );
        });
    });
    describe("group by statement", (): void => {
        it("group statement", (): void => {
            expect(
                new DB("testing")
                    .where("name", "mahmoud")
                    .orWhere("id", "1")
                    .groupBy(["name", "id"])
                    .toSql()
                    .toLowerCase()
            ).toEqual("select * from testing where name = ($1) or id = ($2) group by name,id");
        });
    });
});
