import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  setSocket: (socket: Socket) => void;
  setIsConnected: (isConnected: boolean) => void;
}

const useSocket = create(
  devtools<SocketState>((set) => ({
    socket: null,
    isConnected: false,
    setSocket: (socket) => set({ socket }),
    setIsConnected: (isConnected) => set({ isConnected }),
  }))
);

export default useSocket;
