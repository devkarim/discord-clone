import { z } from 'zod';

import {
  createCategorySchema,
  createChannelSchema,
  createServerSchema,
} from 'models';

import validate from './validate.js';

const create = validate({
  body: createServerSchema,
});

const serverParamsSchema = z.object({
  id: z.string(),
});

const checkId = validate({
  params: serverParamsSchema,
});

const createChannel = validate({
  body: createChannelSchema,
  params: serverParamsSchema,
});

const createCategory = validate({
  body: createCategorySchema,
  params: serverParamsSchema,
});

export default { create, checkId, createChannel, createCategory };
