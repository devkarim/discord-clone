import { useState } from 'react';

import { UpdateMessageSchema } from 'models';

import Avatar from '@/components/ui/avatar';
import { cn, formatDate, handleError } from '@/lib/utils';
import ActionTooltip from '@/components/ui/action-tooltip';
import ConfirmationModal from '@/components/modals/confirmation-modal';

import MessageEdit from './message-edit';
import MessageActions from './message-actions';
import MessageAttachment from './message-attachment';

interface MessageProps {
  id?: string;
  content: string;
  imageUrl?: string | null;
  username: string;
  usernameColor?: string;
  isPending?: boolean | null;
  deleted?: boolean;
  fileUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  canEdit?: boolean;
  canDelete?: boolean;
  onSaveEdit: (data: UpdateMessageSchema) => Promise<any>;
  onDelete: () => Promise<any>;
}

const Message: React.FC<MessageProps> = ({
  id,
  content,
  imageUrl,
  username,
  usernameColor,
  canEdit,
  canDelete,
  isPending,
  deleted,
  fileUrl,
  updatedAt,
  createdAt,
  onSaveEdit,
  onDelete,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const hasAccessToActions = !deleted && (canEdit || canDelete);
  const isEdited = updatedAt !== createdAt;
  const isAttachment = !!fileUrl;

  const saveEdit = async (data: UpdateMessageSchema) => {
    if (isPending) return;
    try {
      setLoading(true);
      await onSaveEdit(data);
      setIsEditing(false);
    } catch (err) {
      handleError(err);
    }
  };

  const onConfirmDeleteMessage = async () => {
    if (isPending) return;
    try {
      setLoading(true);
      await onDelete();
      setDeleting(false);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = () => {
    if (deleted)
      return (
        <p className="italic text-sm text-foreground/60 select-none">
          This message was deleted.
        </p>
      );
    if (fileUrl) return <MessageAttachment fileUrl={fileUrl} />;
    if (isEditing)
      return (
        <MessageEdit
          onSaveEdit={saveEdit}
          onCancelEdit={() => setIsEditing(false)}
          content={content}
          disabled={isLoading}
        />
      );
    return (
      <p className="break-all">
        {content}{' '}
        {isEdited && (
          <ActionTooltip
            label={formatDate(updatedAt)}
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
        onConfirm={onConfirmDeleteMessage}
        loading={isLoading}
      />
      <div
        className={cn(
          'group relative flex gap-4 hover:bg-sidebar/20 py-2 px-6',
          isPending && 'opacity-60'
        )}
      >
        <Avatar
          src={imageUrl}
          name={username}
          alt="avatar"
          showStatus={false}
          parentClassName="w-12 h-12 select-none"
          firstLetterClassName="text-2xl group-hover:opacity-60"
        />
        <div className={cn('w-full space-y-1', isAttachment && 'space-y-2')}>
          <div className="flex items-center gap-2 select-none">
            <p className="font-semibold" style={{ color: usernameColor }}>
              {username}
            </p>
            <p className="text-foreground/60 text-xs">
              {formatDate(createdAt)}
            </p>
          </div>
          <div className="w-full space-y-1">{renderMessageContent()}</div>
        </div>
        {hasAccessToActions && (
          <MessageActions
            showEdit={!!canEdit && !isAttachment}
            showDelete={!!canDelete}
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
