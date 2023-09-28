import { Socket } from 'socket.io';

import messageHandler from '../handlers/message.handler.js';

class EventHandlers {
  static register(socket: Socket) {
    socket.on('message', messageHandler.sendMessage(socket));
  }

  static unregister(socket: Socket) {
    socket.offAny();
  }
}

export default EventHandlers;
