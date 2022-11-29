type Query = {
    command: string;
    where: string[];
    or: string[];
    group_by: string[] | null;
    order_by: string[] | null;
    offset: null | number;
    limit: null | number;
};

abstract class DriverContract {
    protected spilling: Record<
        string,
        (pram: { table: string; columns: string; extra: string[] }) => string
    >;
    protected separator: Record<string, string>;
    protected query: Query = {
        command: "select",
        where: [],
        or: [],
        group_by: null,
        order_by: null,
        offset: null,
        limit: null,
    };
    constructor() {
        this.spilling = this.setSpelling();
        this.separator = this.setSparator();
    }
    public build(table: string, columns: string): string {
        const r: string[] = [];
        Object.entries(this.query).forEach((segmants) => {
            const [command, values] = segmants;
            if (!values) {
                return;
            }
            if (command === "command") {
                r.push(
                    this.spilling[values as string]({
                        table,
                        columns,
                        extra: [],
                    })
                );
                return;
            }
            if (Array.isArray(values)) {
                if (!values.length) {
                    return;
                }
                const resolve = values.map((item: unknown) => {
                    if (Array.isArray(item)) {
                        return item.join(" ");
                    }
                    return item;
                });
                r.push(
                    this.spilling[command]({
                        table,
                        columns,
                        extra: [resolve.join(this.separator[command] ?? " ")],
                    })
                );
                return;
            }
            r.push(this.spilling[command]({ table, columns, extra: [values as string] }));
        });
        return r.join(" ");
    }

    getspilling(command: string): string {
        return command;
    }

    setAttr(name: string, value: any) {
        const prop = (this.query as Record<string, any>)[name];
        if (typeof prop === "string" || prop === null) {
            (this.query as Record<string, any>)[name] = value;
            return;
        }
        (this.query as Record<string, any>)[name].push(value);
    }
    abstract setSpelling(): Record<
        string,
        (pram: { table: string; columns: string; extra: string[] }) => string
    >;
    abstract setSparator(): Record<string, string>;
}
export default DriverContract;
