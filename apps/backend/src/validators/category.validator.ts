import { z } from 'zod';

import { updateCategorySchema } from 'models';

import validate from './validate.js';

const categoryParamsSchema = z.object({
  id: z.string(),
});

const checkId = validate({
  params: categoryParamsSchema,
});

const editCategory = validate({
  params: categoryParamsSchema,
  body: updateCategorySchema,
});

export default { checkId, editCategory };
