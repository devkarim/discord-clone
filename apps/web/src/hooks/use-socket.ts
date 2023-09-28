import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

const useSocket = create(
  devtools<SocketState>((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
  }))
);

export default useSocket;
