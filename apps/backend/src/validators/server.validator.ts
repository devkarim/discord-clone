import { createServerSchema } from 'models';

import validate from './validate';

const create = validate({
  body: createServerSchema,
});

export default { create };
