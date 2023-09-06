import { Request, Response } from 'express';

import { Errors } from 'models';

import ServerResponse from '../models/response.js';
import authValidator from '../validators/auth.validator.js';
import { createUser, isEmailTaken, isUsernameTaken } from '../services/user.js';

const register: typeof authValidator.register = async (req, res) => {
  const { email, username } = req.body;
  const emailTaken = await isEmailTaken(email);
  if (emailTaken) throw Errors.emailTaken;
  const usernameTaken = await isUsernameTaken(username);
  if (usernameTaken) throw Errors.usernameTaken;
  const user = await createUser(req.body);
  return ServerResponse.success(res, user);
};

const login: typeof authValidator.login = async (req, res) => {
  return ServerResponse.success(res, req.user);
};

const me = async (req: Request, res: Response) => {
  return ServerResponse.success(res, req.user);
};

export default {
  login,
  register,
  me,
};
