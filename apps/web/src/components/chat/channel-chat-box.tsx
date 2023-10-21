'use client';

import { toast } from 'react-toastify';

import { Message } from 'database';
import { SendMessageSchema, SocketResponse } from 'models';

import { handleError } from '@/lib/utils';
import useSocket from '@/hooks/use-socket';
import useCurrentMember from '@/hooks/use-current-member';
import useCurrentChannel from '@/hooks/use-current-channel';

import ChatBox from './chat-box';
import useChatMethods from '@/hooks/use-chat-methods';

interface ChannelChatBoxProps {}

const ChannelChatBox: React.FC<ChannelChatBoxProps> = ({}) => {
  const socket = useSocket((state) => state.socket);
  const { data: member } = useCurrentMember();
  const { data: channel } = useCurrentChannel();
  const { addMessage } = useChatMethods(channel?.id);

  if (!channel) return null;

  const sendMessage = async (values: SendMessageSchema) => {
    if (!socket || !socket.active)
      return toast.error('Socket is not connected');
    if (!member) return toast.error('You are not a member of this chat');
    try {
      const response: SocketResponse<{ message: Message }> = await socket
        .timeout(3000)
        .emitWithAck('message', channel.id, values, member.id);
      if (!response.success) {
        return toast.error(response.message);
      }
      const { message } = response.data;
      addMessage({ ...message, author: member });
    } catch (err) {
      handleError(err);
    }
  };

  return <ChatBox name={'#' + channel.name} sendMessage={sendMessage} />;
};

export default ChannelChatBox;
