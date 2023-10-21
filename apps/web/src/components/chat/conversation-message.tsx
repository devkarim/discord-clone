import { UpdateMessageSchema } from 'models';

import useUser from '@/hooks/use-user';
import { FullDirectMessage } from '@/types/db';

import Message from './message';

interface ConversationMessageProps {
  message: FullDirectMessage;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({
  message,
}) => {
  const { data: user } = useUser();

  if (!user) return null;

  const canEdit = user.id == message.authorId;
  const canDelete = user.id == message.authorId;

  const onSaveEdit = async (data: UpdateMessageSchema) => {};

  const onDelete = async () => {};

  return (
    <Message
      id={message.id}
      isPending={message.status === 'PENDING'}
      content={message.content}
      username={message.author.name || message.author.username}
      imageUrl={message.author.imageUrl}
      canEdit={canEdit}
      canDelete={canDelete}
      deleted={message.status === 'DELETED'}
      createdAt={message.createdAt}
      updatedAt={message.updatedAt}
      onSaveEdit={onSaveEdit}
      onDelete={onDelete}
    />
  );
};

export default ConversationMessage;
