import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';

import ActionTooltip from '@/components/ui/action-tooltip';

interface MessageActionsProps {
  showEdit: boolean;
  showDelete: boolean;
  isDeleteDisabled?: boolean;
  isEditDisabled?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  showEdit,
  showDelete,
  isEditDisabled,
  isDeleteDisabled,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="absolute -top-5 right-5 bg-background border-[0.5px] rounded-md hidden group-hover:flex shadow-md overflow-hidden">
      {showEdit && (
        <ActionTooltip label="Edit" hidden={isEditDisabled}>
          <button
            className="hover:bg-active-channel p-3 transition-colors disabled:hover:bg-transparent disabled:opacity-70"
            onClick={onEdit}
            disabled={isEditDisabled}
          >
            <FaPen />
          </button>
        </ActionTooltip>
      )}
      {showDelete && (
        <ActionTooltip label="Delete" hidden={isDeleteDisabled}>
          <button
            className="hover:bg-active-channel p-3 transition-colors disabled:hover:bg-transparent text-destructive disabled:opacity-70"
            onClick={onDelete}
            disabled={isDeleteDisabled}
          >
            <FaTrash />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default MessageActions;
