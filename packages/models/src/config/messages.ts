import { Limits } from './limits';

export const Messages = {
  errors: {
    invalidCredentials: 'Invalid email or password',
    emailTaken: 'Email is already taken',
    usernameTaken: 'Username is already taken',
    unauthenticated: 'You need to be authenticated to do that',
    unauthorized: 'You need to be authorized to do that',
    server: {
      inviteCodeTaken: 'Invite code is already taken',
      invalidId: 'Invalid server id',
      invalidCode: 'Invalid server code',
      ownerCannotLeave: "Server owner can't leave the server",
      notInServer: 'You are not in this server',
      alreadyInServer: 'You are already in this server',
      category: {
        exists: 'Category with this name already exists',
        notExists: 'Category with this name does not exist',
      },
    },
    channel: {
      invalidId: 'Invalid channel id',
    },
    role: {
      invalidId: 'Invalid role id',
      deleteOwner: "Can't delete owner role",
    },
  },
  limits: {
    password: {
      min: `Password must be at least ${Limits.password.min} characters`,
    },
    username: {
      min: `Username must be at least ${Limits.username.min} characters`,
      max: `Username must be at most ${Limits.username.max} characters`,
    },
    server: {
      inviteCode: 'Invite code must be exactly 6 characters',
      name: {
        min: `Server name must be at least ${Limits.server.name.min} characters`,
        max: `Server name must be at most ${Limits.server.name.max} characters`,
      },
    },
    channel: {
      name: {
        min: `Channel name must be at least ${Limits.channel.name.min} characters`,
        max: `Channel name must be at most ${Limits.channel.name.max} characters`,
      },
    },
  },
  required: {
    server: {
      inviteCode: 'Invite code is required',
      name: 'Name is required',
      imageUrl: 'Server image must be a valid URL',
    },
    channel: {
      name: 'Channel name is required',
      type: 'Channel type is required',
    },
    email: 'Email is required',
    password: 'Password is required',
    username: 'Username is required',
  },
} as const;
