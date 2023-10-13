import { Messages } from './messages';
import { Exception } from '../types/error';

export const Errors = {
  invalidCredentials: Exception.manual(Messages.errors.invalidCredentials, 400),
  emailTaken: Exception.manual(Messages.errors.emailTaken, 400),
  user: {
    invalidId: Exception.manual(Messages.errors.user.invalidId, 400),
  },
  conversation: {
    notFound: Exception.manual(Messages.errors.conversation.notFound, 400),
    invalidId: Exception.manual(Messages.errors.conversation.invalidId, 400),
  },
  server: {
    inviteCodeTaken: Exception.manual(
      Messages.errors.server.inviteCodeTaken,
      400
    ),
    invalidId: Exception.manual(Messages.errors.server.invalidId, 400),
    invalidCode: Exception.manual(Messages.errors.server.invalidCode, 400),
    ownerCannotLeave: Exception.manual(
      Messages.errors.server.ownerCannotLeave,
      400
    ),
    notInServer: Exception.manual(Messages.errors.server.notInServer, 400),
    alreadyInServer: Exception.manual(
      Messages.errors.server.alreadyInServer,
      400
    ),
    banned: Exception.manual(Messages.errors.server.banned, 400),
  },
  channel: {
    invalidId: Exception.manual(Messages.errors.channel.invalidId, 400),
  },
  category: {
    invalidId: Exception.manual(Messages.errors.category.invalidId, 400),
    exists: Exception.manual(Messages.errors.category.exists, 400),
    notExists: Exception.manual(Messages.errors.category.notExists, 400),
    notEmpty: Exception.manual(Messages.errors.category.notEmpty, 400),
  },
  message: {
    invalidId: Exception.manual(Messages.errors.message.invalidId, 400),
  },
  role: {
    invalidId: Exception.manual(Messages.errors.role.invalidId, 400),
    deleteOwner: Exception.manual(Messages.errors.role.deleteOwner, 400),
    addOwner: Exception.manual(Messages.errors.role.addOwner, 400),
    kickOwner: Exception.manual(Messages.errors.role.kickOwner, 400),
    banOwner: Exception.manual(Messages.errors.role.banOwner, 400),
    changeOwner: Exception.manual(Messages.errors.role.changeOwner, 400),
    changeSelf: Exception.manual(Messages.errors.role.changeSelf, 400),
  },
  member: {
    invalidId: Exception.manual(Messages.errors.member.invalidId, 400),
    notInServer: Exception.manual(Messages.errors.member.notInServer, 400),
    alreadyInServer: Exception.manual(
      Messages.errors.member.alreadyInServer,
      400
    ),
    kickSelf: Exception.manual(Messages.errors.member.kickSelf, 400),
    banSelf: Exception.manual(Messages.errors.member.banSelf, 400),
  },
  invalidCursor: Exception.manual(Messages.errors.invalidCursor, 400),
  usernameTaken: Exception.manual(Messages.errors.usernameTaken, 400),
  unauthenticated: Exception.manual(Messages.errors.unauthenticated, 401),
  unauthorized: Exception.manual(Messages.errors.unauthorized, 403),
} as const;
