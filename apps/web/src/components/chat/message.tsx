import { formatDate } from '@/lib/utils';
import Avatar from '@/components/ui/avatar';
import { MessageWithAuthor } from '@/types/db';

import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import ActionTooltip from '@/components/ui/action-tooltip';

interface MessageProps {
  message: MessageWithAuthor;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const onEdit = async () => {};

  const onDelete = async () => {};

  return (
    <div className="group relative flex gap-4 items-center hover:bg-sidebar/20 py-2 px-6">
      <Avatar
        src={message.author.user.imageUrl}
        name={message.author.user.username}
        alt="avatar"
        showStatus={false}
        parentClassName="w-12 h-12 select-none"
        firstLetterClassName="text-2xl group-hover:opacity-60"
      />
      <div>
        <div className="flex items-center gap-2 select-none">
          <p className="font-semibold">{message.author.user.username}</p>
          <p className="text-foreground/60 text-xs">
            {formatDate(message.createdAt)}
          </p>
        </div>
        <div>
          <p className="break-all">{message.content}</p>
        </div>
      </div>
      <div className="absolute -top-5 right-5 bg-background border-[0.5px] rounded-md hidden group-hover:flex shadow-md overflow-hidden">
        <ActionTooltip label="Edit">
          <div
            className="hover:bg-active-channel p-3 transition-colors cursor-pointer"
            onClick={onEdit}
          >
            <FaPen />
          </div>
        </ActionTooltip>
        <ActionTooltip label="Delete">
          <div
            className="hover:bg-active-channel p-3 transition-colors cursor-pointer text-destructive"
            onClick={onDelete}
          >
            <FaTrash />
          </div>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default Message;
