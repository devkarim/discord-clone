import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import Errors from "@/config/errors";
import { comparePasswords } from "@/lib/hash";
import {
  getFullUserByEmail,
  getFullUserById,
  parseSession,
} from "@/services/user";

passport.serializeUser<number>(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser<number>(async function (id, done) {
  const user = await getFullUserById(id);
  if (!user) return done(Errors.invalidCredentials);
  done(null, parseSession(user));
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    const user = await getFullUserByEmail(email);
    if (!user) return done(Errors.invalidCredentials);
    const passwordsMatch = await comparePasswords(password, user.password);
    if (!passwordsMatch) return done(Errors.invalidCredentials);
    return done(null, parseSession(user));
  })
);
