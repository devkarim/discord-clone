'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import ActionTooltip from './action-tooltip';

interface HoverCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  parentClassName?: string;
  showIndiaction?: boolean;
  tooltip?: React.ReactNode;
  active?: boolean;
  activeRoute?: string;
  activeClassName?: string;
}

const HoverCircle: React.FC<HoverCircleProps> = ({
  parentClassName,
  className,
  tooltip,
  showIndiaction = true,
  active,
  activeRoute,
  activeClassName,
  ...props
}) => {
  const pathname = usePathname();

  const isActive = active || pathname == activeRoute;

  return (
    <div
      className={cn(
        'p-2 flex items-center justify-center relative',
        parentClassName
      )}
    >
      <ActionTooltip
        label={tooltip}
        sideOffset={12}
        side="right"
        className="text-base"
      >
        <div
          className={cn(
            'flex flex-col justify-center items-center relative overflow-hidden peer h-16 w-16 bg-background hover:bg-primary hover:text-foreground rounded-[32px] hover:rounded-2xl transition-all cursor-pointer duration-300',
            {
              'rounded-2xl bg-primary text-foreground':
                isActive && !activeClassName,
            },
            activeClassName && { [activeClassName]: isActive },
            className
          )}
          {...props}
        />
        {showIndiaction && (
          <span
            className={cn(
              'absolute top-1/3 -left-[1rem] rounded-xl h-8 scale-y-0 bg-foreground peer-hover:scale-y-110 -translate-x-2 peer-hover:translate-x-0 w-4 transition-[transform] duration-300',
              {
                'scale-y-150 translate-x-0 peer-hover:scale-y-150': isActive,
              }
            )}
          />
        )}
      </ActionTooltip>
    </div>
  );
};

export default HoverCircle;
