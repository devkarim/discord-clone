import { createUserSchema, loginUserSchema } from "@/schema/user.schema";

import validate from "./validate";

const register = validate({
  body: createUserSchema,
});

const login = validate({
  body: loginUserSchema,
});

export default { register, login };
