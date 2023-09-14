import { Request, Response } from 'express';

import { Errors } from 'models';

import {
  createServer,
  getUserServers,
  getServerById,
  getFreeCode,
  updateServer,
  isUserOwner,
  deleteOwnerServer,
} from '../services/server.js';
import {
  removeMemberFromServer,
  getMemberByServerUser,
  getServerMembers,
} from '../services/member.js';
import ServerResponse from '../models/response.js';
import { canMemberDoAction } from '../services/member.js';
import { addChannelToServer } from '../services/channel.js';
import {
  addCategoryToServer,
  getCategoryById,
  isCategoryInServer,
} from '../services/category.js';
import {
  addRoleToServer,
  deleteRoleFromServer,
  getRoleById,
  getServerRoles,
} from '../services/role.js';
import serverValidator from '../validators/server.validator.js';

const create: typeof serverValidator.create = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const code = await getFreeCode();
  const server = await createServer(req.user.id, code, req.body);
  return ServerResponse.success(res, server);
};

const getServers = async (req: Request, res: Response) => {
  if (!req.user) throw Errors.unauthenticated;
  const servers = await getUserServers(req.user.id);
  return ServerResponse.success(res, servers);
};

const getServer: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const server = await getServerById(req.user.id, serverId);
  return ServerResponse.success(res, server);
};

const generateInviteCode: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const inviteCode = await getFreeCode();
  const isOwner = await isUserOwner(req.user.id, serverId);
  if (!isOwner) throw Errors.unauthorized;
  const server = await updateServer(req.user.id, serverId, { inviteCode });
  return ServerResponse.success(res, server);
};

const getCurrentMember: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const member = await getMemberByServerUser(req.user.id, serverId);
  return ServerResponse.success(res, member);
};

const leave: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const isOwner = await isUserOwner(req.user.id, serverId);
  if (isOwner) throw Errors.server.ownerCannotLeave;
  const member = await getMemberByServerUser(req.user.id, serverId);
  if (!member) throw Errors.server.notInServer;
  await removeMemberFromServer(req.user.id, serverId);
  return ServerResponse.success(res);
};

const createChannel: typeof serverValidator.createChannel = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  if (req.body.categoryId) {
    const category = await getCategoryById(req.body.categoryId);
    if (!category) throw Errors.server.category.notExists;
    if (category.serverId !== serverId) throw Errors.server.category.notExists;
  }
  const channel = await addChannelToServer(req.user.id, serverId, req.body);
  return ServerResponse.success(res, channel);
};

const createCategory: typeof serverValidator.createCategory = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  const existingCategory = await isCategoryInServer(req.body.name, serverId);
  if (existingCategory) throw Errors.server.category.exists;
  const category = await addCategoryToServer(serverId, req.body);
  return ServerResponse.success(res, category);
};

const getRoles: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  const roles = await getServerRoles(req.user.id, serverId);
  return ServerResponse.success(res, roles);
};

const addRole: typeof serverValidator.addRole = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const hasAccess = await canMemberDoAction(req.user.id, serverId, 'ADD_ROLE');
  if (!hasAccess) throw Errors.unauthorized;
  const role = await addRoleToServer(serverId, req.body);
  return ServerResponse.success(res, role);
};

const deleteRole: typeof serverValidator.deleteRole = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const roleId = +req.params.roleId;
  if (!roleId || isNaN(roleId)) throw Errors.role.invalidId;
  const hasAccess = await canMemberDoAction(req.user.id, serverId, 'ADD_ROLE');
  if (!hasAccess) throw Errors.unauthorized;
  const existingRole = await getRoleById(serverId, roleId);
  if (!existingRole) throw Errors.role.invalidId;
  if (existingRole.permissions.some((p) => p.type === 'OWNER'))
    throw Errors.role.deleteOwner;
  await deleteRoleFromServer(serverId, roleId);
  return ServerResponse.success(res);
};

const getMembers: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const roles = await getServerMembers(req.user.id, serverId);
  return ServerResponse.success(res, roles);
};

const editServer: typeof serverValidator.updateServer = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  const server = await updateServer(req.user.id, serverId, req.body);
  return ServerResponse.success(res, server);
};

const deleteServer: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const isOwner = await isUserOwner(req.user.id, serverId);
  if (!isOwner) throw Errors.unauthorized;
  await deleteOwnerServer(req.user.id, serverId);
  return ServerResponse.success(res);
};

export default {
  create,
  getServers,
  getServer,
  generateInviteCode,
  getCurrentMember,
  leave,
  createChannel,
  createCategory,
  getRoles,
  getMembers,
  editServer,
  addRole,
  deleteRole,
  deleteServer,
};
