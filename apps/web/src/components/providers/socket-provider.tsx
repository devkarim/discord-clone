'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';

import useSocket from '@/hooks/use-socket';
import { API_URL } from '@/config/constants';

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const globalSocket = useSocket();

  useEffect(() => {
    const newSocket = io(API_URL, {
      withCredentials: true,
      transports: ['websocket'],
    });

    globalSocket.setSocket(newSocket);

    newSocket.on('connection', () => {
      console.log('Connected to socket');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket');
    });

    return () => {
      newSocket.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default SocketProvider;
