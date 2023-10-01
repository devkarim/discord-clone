import { Socket } from 'socket.io';

import { Status } from 'database';

import { handleSocketError } from '../lib/utils.js';
import { getFullUserById, setUserStatus } from '../services/user.js';
import SocketHandler from '../models/socket-handler.js';
import { STATUS_CHANGE_KEY } from '../config/constants.js';
import { getUserServers } from '../services/server.js';

const setStatus = async (socket: Socket, status: Status) => {
  try {
    if (!socket.request.user) return;
    const user = await getFullUserById(socket.request.user.id);
    if (!user || user.status == status) return;
    await setUserStatus(user.id, status);
    const servers = await getUserServers(user.id);
    if (servers && servers.length !== 0) {
      for (const server of servers) {
        SocketHandler.emitAuth(
          `${STATUS_CHANGE_KEY}:${server.id}`,
          user.id,
          status
        );
      }
    }
    socket.emit(STATUS_CHANGE_KEY, user.id, status);
  } catch (error) {
    handleSocketError('setStatus/status.handler', error);
  }
};

export default { setStatus };
