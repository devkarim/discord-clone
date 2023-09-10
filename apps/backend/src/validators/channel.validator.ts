import { z } from 'zod';

import validate from './validate.js';

const serverParamsSchema = z.object({
  id: z.string(),
});

const checkId = validate({
  params: serverParamsSchema,
});

export default { checkId };
