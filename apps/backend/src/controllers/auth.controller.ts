import { Request, Response } from "express";

import Errors from "@/config/errors";
import ServerResponse from "@/models/response";
import authValidator from "@/validators/auth.validator";
import { createUser, isEmailTaken } from "@/services/user";

const register: typeof authValidator.register = async (req, res) => {
  const { email } = req.body;
  const emailTaken = await isEmailTaken(email);
  if (emailTaken) throw Errors.emailTaken;
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
