import { z } from 'zod';

import { updateMessageSchema } from 'models';

import validate from './validate.js';

const checkIdSchema = z.object({
  id: z.string(),
});

const checkId = validate({
  params: checkIdSchema,
});

const updateMessage = validate({
  body: updateMessageSchema.partial(),
  params: checkIdSchema,
});

export default { checkId, updateMessage };
