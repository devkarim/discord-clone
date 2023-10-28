import { NextFunction, Request, Response } from 'express';

import { Errors } from 'models';

import {
  getUserMutuals,
  isUsernameTaken,
  updateUser,
} from '../services/user.js';
import ServerResponse from '../models/response.js';
import { COOKIE_NAME } from '../config/constants.js';
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

const getMutuals = async (req: Request, res: Response) => {
  if (!req.user) throw Errors.unauthenticated;
  const mutuals = await getUserMutuals(req.user.id);
  return ServerResponse.success(res, mutuals);
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw Errors.unauthenticated;
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      return ServerResponse.success(res);
    });
  });
};

export default { updateServerUser, getMutuals, logout };
