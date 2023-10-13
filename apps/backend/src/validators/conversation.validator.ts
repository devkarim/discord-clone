import { z } from 'zod';

import validate from './validate.js';

const checkIdSchema = z.object({
  id: z.string(),
});

const checkId = validate({
  params: checkIdSchema,
});

const getConversationMessages = validate({
  params: checkIdSchema,
  query: z.object({
    cursor: z.string().optional(),
  }),
});

export default { checkId, getConversationMessages };
