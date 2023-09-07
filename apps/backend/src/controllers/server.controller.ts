import { Request, Response } from 'express';

import { Errors } from 'models';

import { generateCode } from '../lib/utils.js';
import {
  createServer,
  getServerByInviteCode,
  getUserServers,
  getServerById,
} from '../services/server.js';
import serverValidator from '../validators/server.validator.js';
import ServerResponse from '../models/response.js';

const create: typeof serverValidator.create = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  let code: string = '';
  while (!code) {
    const generatedCode = await generateCode();
    const isCodeTaken = await getServerByInviteCode(generatedCode);
    if (!isCodeTaken) {
      code = generatedCode;
    }
  }
  const server = await createServer(req.user.id, code, req.body);
  return ServerResponse.success(res, server);
};

const getServers = async (req: Request, res: Response) => {
  if (!req.user) throw Errors.unauthenticated;
  const servers = await getUserServers(req.user.id);
  return ServerResponse.success(res, servers);
};

const getServer: typeof serverValidator.getServer = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const serverId = +req.params.id;
  if (!serverId || isNaN(serverId)) throw Errors.server.invalidId;
  const server = await getServerById(serverId);
  return ServerResponse.success(res, server);
};

export default { create, getServers, getServer };
