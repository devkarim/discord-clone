import { MessageWithAuthor } from '@/types/db';
import { canMemberDoAction } from '@/lib/permission';
import useCurrentMember from '@/hooks/use-current-member';

import Message from './message';

interface ChannelMessageProps {
  message: Omit<MessageWithAuthor, 'id'> & {
    id?: number;
    pendingMessageId?: string;
  };
}

const ChannelMessage: React.FC<ChannelMessageProps> = ({ message }) => {
  const { data: member } = useCurrentMember();

  if (!member) return null;

  const canEdit =
    canMemberDoAction(member, 'EDIT_MESSAGES') ||
    member.id === message.author.id;
  const canDelete =
    canMemberDoAction(member, 'DELETE_MESSAGES') ||
    member.id === message.author.id;

  return (
    <Message
      id={message.id}
      pendingMessageId={message.pendingMessageId}
      content={message.content}
      username={message.author.user.name || message.author.user.username}
      usernameColor={message.author.role?.color}
      imageUrl={message.author.user.imageUrl}
      canEdit={canEdit}
      canDelete={canDelete}
      deleted={message.deleted}
      createdAt={message.createdAt}
      updatedAt={message.updatedAt}
    />
  );
};

export default ChannelMessage;
