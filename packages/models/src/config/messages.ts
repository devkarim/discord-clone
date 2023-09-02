import { Limits } from './limits';

export const Messages = {
  errors: {
    invalidCredentials: 'Invalid email or password',
    emailTaken: 'Email is already taken',
    usernameTaken: 'Username is already taken',
    unauthenticated: 'You need to be authenticated to do that',
    unauthorized: 'You need to be authorized to do that',
  },
  limits: {
    password: {
      min: `Password must be at least ${Limits.password.min} characters`,
    },
    username: {
      min: `Username must be at least ${Limits.username.min} characters`,
    },
  },
  required: {
    email: 'Email is required',
    password: 'Password is required',
    username: 'Username is required',
  },
} as const;
