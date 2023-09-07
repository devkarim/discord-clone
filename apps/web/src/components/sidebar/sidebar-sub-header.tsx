import { FaPlus } from '@react-icons/all-files/fa6/FaPlus';

import IconButton from '@/components/ui/icon-button';

interface SidebarSubHeaderProps {
  label: string;
  tooltip?: string;
  showAddButton?: boolean;
  onClick?: () => void;
}

const SidebarSubHeader: React.FC<SidebarSubHeaderProps> = ({
  label,
  tooltip,
  showAddButton,
  onClick,
}) => {
  return (
    <div className="flex justify-between items-center font-semibold group transition-opacity px-3">
      <span className="text-sm opacity-60 group-hover:opacity-100 uppercase">
        {label}
      </span>
      {showAddButton && (
        <IconButton tooltip={tooltip} side="bottom" onClick={onClick}>
          <FaPlus />
        </IconButton>
      )}
    </div>
  );
};

export default SidebarSubHeader;
