import Limits from "./limits";

const Messages = {
  errors: {
    invalidCredentials: "Invalid email or password.",
    emailTaken: "Email is already taken.",
    unauthenticated: "You need to be authenticated to do that.",
    unauthorized: "You need to be authorized to do that.",
  },
  limits: {
    password: {
      min: `Password must be at least ${Limits.password.min} characters.`,
    },
  },
  required: {
    email: "Email is required.",
    password: "Password is required.",
  },
} as const;

export default Messages;
