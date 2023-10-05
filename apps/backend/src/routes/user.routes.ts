import express from 'express';

import userValidator from '../validators/user.validator.js';
import requireAuth from '../middlewares/auth/requireAuth.js';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

// @route     PATCH /user/
// @desc      Update user's data
// @access    Private
userRouter.patch(
  '/',
  requireAuth,
  userValidator.updateServerUser,
  userController.updateServerUser
);

export default userRouter;
