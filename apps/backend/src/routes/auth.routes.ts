import express from "express";
import passport from "passport";

import authValidator from "@/validators/auth.validator";
import requireAuth from "@/middlewares/auth/requireAuth";
import authController from "@/controllers/auth.controller";

const authRouter = express.Router();

// @route     POST /auth/login
// @desc      Log into user's account
// @access    Public
authRouter.post(
  "/login",
  authValidator.login,
  passport.authenticate("local", {
    failWithError: true,
  }),
  authController.login
);

// @route     POST /auth/register
// @desc      Create a new account
// @access    Public
authRouter.post("/register", authValidator.register, authController.register);

// @route     GET /auth/me
// @desc      Fetches current session data
// @access    Private
authRouter.get("/me", requireAuth, authController.me);

export default authRouter;
