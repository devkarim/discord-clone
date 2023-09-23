'use client';

import { FaPlus } from '@react-icons/all-files/fa6/FaPlus';

import { cn } from '@/lib/utils';
import IconButton from '@/components/ui/icon-button';
import { useEffect, useState } from 'react';

interface SidebarSubHeaderProps {
  label?: string;
  tooltip?: string;
  showAddButton?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const SidebarSubHeader: React.FC<SidebarSubHeaderProps> = ({
  label,
  tooltip,
  showAddButton,
  onClick,
  className,
  children,
}) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        'flex justify-between items-center font-semibold group transition-opacity px-3',
        className
      )}
    >
      <span className="text-sm opacity-60 group-hover:opacity-100 uppercase">
        {label}
        {children}
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
