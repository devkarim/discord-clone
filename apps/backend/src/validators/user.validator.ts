import { updateUserSchema } from 'models';

import validate from './validate.js';

const updateServerUser = validate({
  body: updateUserSchema,
});

export default { updateServerUser };
