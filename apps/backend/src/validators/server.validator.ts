import { z } from 'zod';

import { createServerSchema } from 'models';

import validate from './validate.js';

const create = validate({
  body: createServerSchema,
});

const serverParamsSchema = z.object({
  id: z.string(),
});

const getServer = validate({
  params: serverParamsSchema,
});

export default { create, getServer };
