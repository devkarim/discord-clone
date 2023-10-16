'use client';

import { toast } from 'react-toastify';

import { SendMessageSchema, SocketResponse } from 'models';

import { handleError } from '@/lib/utils';
import useSocket from '@/hooks/use-socket';
import useCurrentMember from '@/hooks/use-current-member';
import useCurrentChannel from '@/hooks/use-current-channel';
import usePendingMessages from '@/hooks/use-pending-messages';

import ChatBox from './chat-box';

interface ChannelChatBoxProps {}

const ChannelChatBox: React.FC<ChannelChatBoxProps> = ({}) => {
  const socket = useSocket((state) => state.socket);
  const { data: member } = useCurrentMember();
  const addPendingMessage = usePendingMessages((state) => state.addMessage);

  const { data: channel } = useCurrentChannel();

  if (!channel) return null;

  const sendMessage = async (values: SendMessageSchema) => {
    if (!socket || !socket.active)
      return toast.error('Socket is not connected');
    if (!member) return toast.error('You are not a member of this chat');
    try {
      const response: SocketResponse<{ pendingMessageId: string }> =
        await socket.timeout(3000).emitWithAck('message', channel.id, values);
      if (!response.success) {
        return toast.error(response.message);
      }
      const createdAt = new Date();
      const { pendingMessageId } = response.data;
      addPendingMessage({
        pendingMessageId,
        authorId: member.id,
        author: {
          ...member,
        },
        channelId: channel.id,
        createdAt,
        updatedAt: createdAt,
        deleted: false,
        content: values.content,
        fileUrl: values.fileUrl ?? null,
      });
    } catch (err) {
      handleError(err);
    }
  };

  return <ChatBox name={'#' + channel.name} sendMessage={sendMessage} />;
};

export default ChannelChatBox;
