import { z } from 'zod';

import validate from './validate.js';

const checkId = validate({
  params: z.object({
    id: z.string(),
  }),
});

export default { checkId };
