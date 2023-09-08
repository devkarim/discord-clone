import { Request, Response } from 'express';

import { Errors } from 'models';

import {
  createServer,
  getUserServers,
  getServerById,
  getServerByCodeAndNotUser,
  getFreeCode,
  updateServer,
  addMemberToServer,
  getServerByCode,
  isUserInServer,
} from '../services/server.js';
import serverValidator from '../validators/server.validator.js';
import ServerResponse from '../models/response.js';

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
  const server = await updateServer(req.user.id, serverId, { inviteCode });
  return ServerResponse.success(res, server);
};

const getServerByInviteCode: typeof serverValidator.checkId = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const inviteCode = req.params.id;
  if (!inviteCode) throw Errors.server.invalidCode;
  const server = await getServerByCode(inviteCode);
  if (!server) throw Errors.server.invalidCode;
  const isInServer = await isUserInServer(req.user.id, server.id);
  return ServerResponse.success(res, { server, isInServer });
};

const joinServer: typeof serverValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const inviteCode = req.params.id;
  if (!inviteCode) throw Errors.server.invalidCode;
  const checkServerCode = await getServerByCodeAndNotUser(
    req.user.id,
    inviteCode
  );
  if (!checkServerCode) throw Errors.server.invalidCode;
  const server = await addMemberToServer(req.user.id, inviteCode);
  return ServerResponse.success(res, server);
};

export default {
  create,
  getServers,
  getServer,
  generateInviteCode,
  getServerByInviteCode,
  joinServer,
};
