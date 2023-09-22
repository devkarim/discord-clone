import { z } from 'zod';

import { sendMessageSchema } from 'models';

import validate from './validate.js';

const channelParamsSchema = z.object({
  id: z.string(),
});

const checkId = validate({
  params: channelParamsSchema,
});

const sendMessage = validate({
  params: channelParamsSchema,
  body: sendMessageSchema,
});

const getMessages = validate({
  params: channelParamsSchema,
  query: z.object({
    cursor: z.string().optional(),
  }),
});

export default { checkId, sendMessage, getMessages };
