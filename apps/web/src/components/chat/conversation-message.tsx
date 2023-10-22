import { toast } from 'react-toastify';

import { UpdateMessageSchema } from 'models';

import useUser from '@/hooks/use-user';
import { handleError } from '@/lib/utils';
import { FullDirectMessage } from '@/types/db';
import { deleteDirectMessage, updateDirectMessage } from '@/services/message';

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

  const onSaveEdit = async (data: UpdateMessageSchema) => {
    if (!message.id || message.status !== 'DELIVERED')
      return toast.error('This message is pending, please wait...');
    try {
      await updateDirectMessage(message.id, data);
    } catch (err) {
      handleError(err);
    }
  };

  const onDelete = async () => {
    if (!message.id || message.status !== 'DELIVERED')
      return toast.error('This message is pending, please wait...');
    try {
      await deleteDirectMessage(message.id);
    } catch (err) {
      handleError(err);
    }
  };

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
