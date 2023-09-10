'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import ActionTooltip from './action-tooltip';

interface IconButtonProps {
  className?: string;
  onClick?: () => void;
  onHover?: () => void;
  tooltip?: React.ReactNode;
  side?: 'bottom' | 'top' | 'right' | 'left' | undefined;
  bg?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  onClick,
  onHover,
  tooltip,
  side,
  bg = false,
  active = false,
  children,
}) => {
  const [isMouseOut, setIsMouseOut] = useState(true);

  return (
    <ActionTooltip label={tooltip} side={side} sideOffset={12}>
      <p
        className={cn(
          'cursor-pointer opacity-60 hover:opacity-100 transition-opacity',
          bg && 'p-2 hover:bg-foreground/10 rounded-lg transition-colors',
          active && 'opacity-100',
          className
        )}
        onMouseEnter={() => {
          if (!isMouseOut) return;
          setIsMouseOut(false);
          onHover?.();
        }}
        onMouseLeave={() => setIsMouseOut(true)}
        onClick={onClick}
      >
        {children}
      </p>
    </ActionTooltip>
  );
};

export default IconButton;
