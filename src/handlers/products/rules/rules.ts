import { Request } from "express";

const rules = (req: Request) => {
    const schema: Record<string, string> = {
        category: "nullable",
        price: "required|numeric",
    };
    switch (req.method) {
        case "POST":
            schema.name = "required|unique:products,name";
            break;
        case "PUT":
        case "PATCH":
            schema.name = `required|unique:products,name,${req.params.id}`;
            break;
    }
    return schema;
};
export default rules;
