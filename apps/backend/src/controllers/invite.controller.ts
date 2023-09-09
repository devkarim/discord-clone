import { Errors } from 'models';

import {
  getServerByCode,
  isUserInServer,
  isUserInServerCode,
  getServerByCodeAndNotUser,
} from '../services/server.js';
import ServerResponse from '../models/response.js';
import { addMemberToServer } from '../services/member.js';
import serverValidator from '../validators/server.validator.js';

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
  const isInServer = await isUserInServerCode(req.user.id, inviteCode);
  if (isInServer) throw Errors.server.alreadyInServer;
  const checkServerCode = await getServerByCodeAndNotUser(
    req.user.id,
    inviteCode
  );
  if (!checkServerCode) throw Errors.server.invalidCode;
  const server = await addMemberToServer(req.user.id, inviteCode);
  return ServerResponse.success(res, server);
};

export default {
  getServerByInviteCode,
  joinServer,
};
