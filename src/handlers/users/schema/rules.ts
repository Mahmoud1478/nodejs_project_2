import { Request } from "express";

const rules = (req: Request) => {
  const schema: { [x: string]: string } = {
    lastname: "required",
  };
  switch (req.method) {
    case "POST":
      schema.firstname = "required|unique:users,firstname";
      schema.password = "required";
      break;
    case "PUT":
    case "PATCH":
      schema.fristname = `required|unique:users,firstname,${req.params.id}`;
      schema.password = "nullable";
      break;
  }
  return schema;
};
export default rules;
