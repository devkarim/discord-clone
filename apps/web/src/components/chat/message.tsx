import { useState } from 'react';
import { toast } from 'react-toastify';

import { UpdateMessageSchema } from 'models';

import Avatar from '@/components/ui/avatar';
import { MessageWithAuthor } from '@/types/db';
import { canMemberDoAction } from '@/lib/permission';
import { cn, formatDate, handleError } from '@/lib/utils';
import useCurrentMember from '@/hooks/use-current-member';
import ActionTooltip from '@/components/ui/action-tooltip';
import { deleteMessage, updateMessage } from '@/services/message';
import ConfirmationModal from '@/components/modals/confirmation-modal';

import MessageEdit from './message-edit';
import MessageActions from './message-actions';
import MessageAttachment from './message-attachment';

interface MessageProps {
  message: Omit<MessageWithAuthor, 'id'> & {
    id?: number;
    pendingMessageId?: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [isLoading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { data: member } = useCurrentMember();

  if (!member) return null;

  const canEdit =
    canMemberDoAction(member, 'EDIT_MESSAGES') ||
    member.id === message.author.id;
  const canDelete =
    canMemberDoAction(member, 'DELETE_MESSAGES') ||
    member.id === message.author.id;
  const hasAccessToActions = !message.deleted && (canEdit || canDelete);
  const isEdited = message.updatedAt !== message.createdAt;
  const isAttachment = !!message.fileUrl;

  const user = message.author.user;

  const saveEdit = async (data: UpdateMessageSchema) => {
    if (!message.id || message.pendingMessageId)
      return toast.error('This message is pending, please wait...');
    try {
      setLoading(true);
      await updateMessage(message.id, data);
      setIsEditing(false);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!message.id || message.pendingMessageId)
      return toast.error('This message is pending, please wait...');
    try {
      setLoading(true);
      await deleteMessage(message.id);
      setDeleting(false);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = () => {
    if (message.deleted)
      return (
        <p className="italic text-sm text-foreground/60 select-none">
          This message was deleted.
        </p>
      );
    if (message.fileUrl) return <MessageAttachment fileUrl={message.fileUrl} />;
    if (isEditing)
      return (
        <MessageEdit
          onSaveEdit={saveEdit}
          onCancelEdit={() => setIsEditing(false)}
          content={message.content}
          disabled={isLoading}
        />
      );
    return (
      <p className="break-all">
        {message.content}{' '}
        {isEdited && (
          <ActionTooltip
            label={formatDate(message.updatedAt)}
            triggerClassName="cursor-default"
          >
            <span className="text-foreground/60 text-[10px] select-none">
              (edited)
            </span>
          </ActionTooltip>
        )}
      </p>
    );
  };

  return (
    <>
      <ConfirmationModal
        isOpen={deleting}
        onOpenChange={setDeleting}
        title="Are you sure you want to delete this message?"
        subtitle="By deleting this message, you will not be able to recover it."
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div
        className={cn(
          'group relative flex gap-4 hover:bg-sidebar/20 py-2 px-6',
          message.pendingMessageId && 'opacity-60'
        )}
      >
        <Avatar
          src={user.imageUrl}
          name={user.username}
          alt="avatar"
          showStatus={false}
          parentClassName="w-12 h-12 select-none"
          firstLetterClassName="text-2xl group-hover:opacity-60"
        />
        <div className={cn('w-full space-y-1', isAttachment && 'space-y-2')}>
          <div className="flex items-center gap-2 select-none">
            <p
              className="font-semibold"
              style={{ color: message.author.role?.color }}
            >
              {user.name || user.username}
            </p>
            <p className="text-foreground/60 text-xs">
              {formatDate(message.createdAt)}
            </p>
          </div>
          <div className="w-full space-y-1">{renderMessageContent()}</div>
        </div>
        {hasAccessToActions && (
          <MessageActions
            showEdit={canEdit && !isAttachment}
            showDelete={canDelete}
            isEditDisabled={isLoading || isEditing}
            isDeleteDisabled={isLoading}
            onEdit={() => setIsEditing(true)}
            onDelete={() => setDeleting(true)}
          />
        )}
      </div>
    </>
  );
};

export default Message;
