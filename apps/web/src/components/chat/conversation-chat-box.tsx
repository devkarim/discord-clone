'use client';

import { toast } from 'react-toastify';

import { SendMessageSchema, SocketResponse } from 'models';

import { handleError } from '@/lib/utils';
import useSocket from '@/hooks/use-socket';
import useCurrentConversation from '@/hooks/use-current-conversation';

import ChatBox from './chat-box';

interface ConversationChatBoxProps {}

const ConversationChatBox: React.FC<ConversationChatBoxProps> = ({}) => {
  const { data } = useCurrentConversation();
  const socket = useSocket((state) => state.socket);

  if (!data) return null;

  const sendMessage = async (values: SendMessageSchema) => {
    if (!socket || !socket.active)
      return toast.error('Socket is not connected');
    try {
      const response: SocketResponse<{ pendingMessageId: string }> =
        await socket
          .timeout(3000)
          .emitWithAck('message:conversation', data.conversation.id, values);
      if (!response.success) {
        return toast.error(response.message);
      }
      const createdAt = new Date();
      const { pendingMessageId } = response.data;
      // addPendingMessage({
      //   pendingMessageId,
      //   authorId: member.id,
      //   author: {
      //     ...member,
      //   },
      //   channelId: channel.id,
      //   createdAt,
      //   updatedAt: createdAt,
      //   deleted: false,
      //   content: values.content,
      //   fileUrl: values.fileUrl ?? null,
      // });
    } catch (err) {
      handleError(err);
    }
  };

  return <ChatBox name={data.user.username} sendMessage={sendMessage} />;
};

export default ConversationChatBox;
