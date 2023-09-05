import { Exception } from '../types/error';
import { Messages } from './messages';

export const Errors = {
  invalidCredentials: Exception.manual(Messages.errors.invalidCredentials, 400),
  emailTaken: Exception.manual(Messages.errors.emailTaken, 400),
  server: {
    inviteCodeTaken: Exception.manual(
      Messages.errors.server.inviteCodeTaken,
      400
    ),
  },
  usernameTaken: Exception.manual(Messages.errors.usernameTaken, 400),
  unauthenticated: Exception.manual(Messages.errors.unauthenticated, 401),
  unauthorized: Exception.manual(Messages.errors.unauthorized, 403),
} as const;
