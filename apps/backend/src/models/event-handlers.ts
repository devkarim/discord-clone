import { Socket } from 'socket.io';

import messageHandler from '../handlers/message.handler.js';
import statusHandler from '../handlers/status.handler.js';
import { Status } from 'database';

class EventHandlers {
  static register(socket: Socket) {
    socket.on('message', messageHandler.sendMessage(socket));
    statusHandler.setStatus(socket, Status.ONLINE);
  }

  static unregister(socket: Socket) {
    socket.offAny();
    statusHandler.setStatus(socket, Status.OFFLINE);
  }
}

export default EventHandlers;
