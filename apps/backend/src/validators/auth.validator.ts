import { registerSchema, loginSchema } from 'models';

import validate from './validate.js';

const register = validate({
  body: registerSchema,
});

const login = validate({
  body: loginSchema,
});

export default { register, login };
