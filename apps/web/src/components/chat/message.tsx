import { useState } from 'react';

import { UpdateMessageSchema } from 'models';

import Avatar from '@/components/ui/avatar';
import { MessageWithAuthor } from '@/types/db';
import { canMemberDoAction } from '@/lib/permission';
import { formatDate, handleError } from '@/lib/utils';
import useCurrentMember from '@/hooks/use-current-member';
import ActionTooltip from '@/components/ui/action-tooltip';
import { deleteMessage, updateMessage } from '@/services/message';
import ConfirmationModal from '@/components/modals/confirmation-modal';

import MessageActions from './message-actions';
import MessageEdit from './message-edit';

interface MessageProps {
  message: MessageWithAuthor;
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
  const hasAccessToActions = canEdit || canDelete;
  const isEdited = message.updatedAt !== message.createdAt;

  const saveEdit = async (data: UpdateMessageSchema) => {
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
    try {
      setLoading(true);
      await deleteMessage(message.id);
      setIsEditing(false);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative flex gap-4 items-center hover:bg-sidebar/20 py-2 px-6">
      <ConfirmationModal
        isOpen={deleting}
        onOpenChange={setDeleting}
        title="Are you sure you want to delete this message?"
        subtitle="By deleting this message, you will not be able to recover it."
        onConfirm={onDelete}
        loading={isLoading}
      />
      <Avatar
        src={message.author.user.imageUrl}
        name={message.author.user.username}
        alt="avatar"
        showStatus={false}
        parentClassName="w-12 h-12 select-none"
        firstLetterClassName="text-2xl group-hover:opacity-60"
      />
      <div className="w-full space-y-1">
        <div className="flex items-center gap-2 select-none">
          <p className="font-semibold">{message.author.user.username}</p>
          <p className="text-foreground/60 text-xs">
            {formatDate(message.createdAt)}
          </p>
        </div>
        <div className="w-full space-y-1">
          {isEditing ? (
            <MessageEdit
              onSaveEdit={saveEdit}
              onCancelEdit={() => setIsEditing(false)}
              content={message.content}
              disabled={isLoading}
            />
          ) : (
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
          )}
        </div>
      </div>
      {hasAccessToActions && (
        <MessageActions
          showEdit={canEdit}
          showDelete={canDelete}
          isEditDisabled={isLoading || isEditing}
          isDeleteDisabled={isLoading}
          onEdit={() => setIsEditing(true)}
          onDelete={() => setDeleting(true)}
        />
      )}
    </div>
  );
};

export default Message;
