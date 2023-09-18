import { PermissionType } from 'database';

export const EMOJIS = [
  '😄',
  '😍',
  '🥰',
  '😊',
  '😎',
  '🤩',
  '😋',
  '🥳',
  '😁',
  '😆',
  '😃',
  '🤗',
  '😌',
  '😏',
  '😇',
  '🤓',
  '🙃',
  '😢',
  '😭',
  '😠',
  '😡',
  '😤',
  '😱',
  '😩',
  '😬',
  '🥺',
  '😷',
  '🤒',
  '🤢',
  '🤮',
  '🤕',
  '🤠',
  '🤡',
  '🤥',
  '🥴',
  '🥵',
  '🤯',
  '🥶',
  '😵',
  '🤮',
];

export const DEFAULT_ROLE_COLOR = '#C20071';

export const PERMISSION_DESCRIPTIONS: {
  [key in Exclude<PermissionType, 'OWNER'>]: {
    name: string;
    description: string;
  };
} = {
  ADMINISTRATOR: {
    name: 'Administrator',
    description: 'Members with this permission will have every permission.',
  },
  ADD_ROLE: {
    name: 'Add Role',
    description:
      'Allows members to create new roles and edit or delete roles lower than their highest role.',
  },
  BAN_USERS: {
    name: 'Ban Members',
    description:
      'Allows members to permanently ban other members from this server.',
  },
  DELETE_MESSAGES: {
    name: 'Delete Messages',
    description: 'Allows members to delete messages by other members.',
  },
  KICK_MEMBERS: {
    name: 'Kick Members',
    description:
      'Allows members to remove other members from this server. Kicked members will be able to rejoin if they have another invite.',
  },
  MANAGE_SERVER: {
    name: 'Manage Server',
    description: "Allow members to change this server's name and image.",
  },
  MANAGE_USERS: {
    name: 'Manage Users',
    description: 'Allow members to add roles to and remove roles from members.',
  },
  GENERATE_INVITE_LINK: {
    name: 'Create Invite',
    description: 'Allows members to invite new people to this server.',
  },
  EDIT_MESSAGES: {
    name: 'Edit Messages',
    description: 'Allows members to edit messages by other members.',
  },
};
