import { createServerSchema } from 'models';

import validate from './validate.js';

const create = validate({
  body: createServerSchema,
});

export default { create };
