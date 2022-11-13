import Joi, { StringSchema } from "joi";
import { stringify } from "querystring";
import { unique } from "../../inc/validation/rules";
type userSchema = {
  firstname: StringSchema;
  lastname: StringSchema;
  password: StringSchema;
};
const schema: userSchema = {
  firstname: Joi.string(),
  lastname: Joi.string().required(),
  password: Joi.string(),
};
const genrate = async (
  values: { [x: string]: string | number },
  method: string,
  id: string | null | undefined = null
): Promise<object> => {
  switch (method) {
    case "POST":
      schema.firstname = Joi.string()
        .required()

        .external(async (value: string): Promise<undefined> => {
          if (!(await unique(value, "users", "firstname", id))) {
            return undefined;
          }
          throw Error(`${value} aready exists`);
        });
      schema.password = Joi.string().required();

      break;

    default:
      break;
  }

  return await Joi.object(schema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validateAsync(values);
};

export default genrate;
