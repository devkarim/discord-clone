'use client';

import { toast } from 'react-toastify';

import { DirectMessage } from 'database';
import { SendMessageSchema, SocketResponse } from 'models';

import { handleError } from '@/lib/utils';
import useSocket from '@/hooks/use-socket';
import useCurrentConversation from '@/hooks/use-current-conversation';

import ChatBox from './chat-box';
import useChatMethods from '@/hooks/use-chat-methods';

interface ConversationChatBoxProps {}

const ConversationChatBox: React.FC<ConversationChatBoxProps> = ({}) => {
  const { data } = useCurrentConversation();
  const socket = useSocket((state) => state.socket);
  const { addMessage } = useChatMethods(data?.conversation.id);

  if (!data) return null;

  const sendMessage = async (values: SendMessageSchema) => {
    if (!socket || !socket.active)
      return toast.error('Socket is not connected');
    try {
      const response: SocketResponse<{ message: DirectMessage }> = await socket
        .timeout(3000)
        .emitWithAck('message:conversation', data.conversation.id, values);
      if (!response.success) {
        return toast.error(response.message);
      }
      const { message } = response.data;
      addMessage({ ...message, author: data.user });
    } catch (err) {
      handleError(err);
    }
  };

  return <ChatBox name={data.user.username} sendMessage={sendMessage} />;
};

export default ConversationChatBox;
