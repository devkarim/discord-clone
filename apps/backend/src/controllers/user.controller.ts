import { Errors } from 'models';

import { isUsernameTaken, updateUser } from '../services/user.js';
import ServerResponse from '../models/response.js';
import userValidator from '../validators/user.validator.js';

const updateServerUser: typeof userValidator.updateServerUser = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const username = req.body.username;
  if (username !== req.user.username) {
    const usernameTaken = await isUsernameTaken(username);
    if (usernameTaken) throw Errors.usernameTaken;
  }
  const user = await updateUser(req.user.id, req.body);
  return ServerResponse.success(res, user);
};

export default { updateServerUser };
