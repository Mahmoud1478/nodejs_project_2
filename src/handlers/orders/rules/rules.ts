import { Request } from "express";

const rules = (request: Request) => {
    const schema: Record<string, string> = {
        status: "required|in:current,closed",
        "products.*.product_id": "required|integer|exists:products,id",
        "products.*.quantity": "required|integer",
    };
    switch (request.method) {
        case "POST":
            schema.products = "required|array";
            break;
        case "PUT":
            schema.products = "array";
            break;
    }
    return schema;
};
export default rules;
