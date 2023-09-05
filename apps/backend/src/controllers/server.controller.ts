import { Request, Response } from 'express';

import { Errors } from 'models';

import {
  createServer,
  getServerByInviteCode,
  getUserServers,
} from '@/services/server';
import serverValidator from '@/validators/server.validator';
import ServerResponse from '@/models/response';

const create: typeof serverValidator.create = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const isCodeTaken = await getServerByInviteCode(req.body.inviteCode);
  if (isCodeTaken) throw Errors.server.inviteCodeTaken;
  const server = await createServer(req.user.id, req.body);
  return ServerResponse.success(res, server);
};

const getServers = async (req: Request, res: Response) => {
  if (!req.user) throw Errors.unauthenticated;
  const servers = await getUserServers(req.user.id);
  return ServerResponse.success(res, servers);
};

export default { create, getServers };
