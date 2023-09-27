import { ComponentProps } from 'react';

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from './tooltip';

interface ActionTooltipProps extends ComponentProps<typeof TooltipContent> {
  label?: React.ReactNode;
  triggerClassName?: string;
}

const ActionTooltip: React.FC<ActionTooltipProps> = ({
  label,
  triggerClassName,
  children,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} disableHoverableContent>
        <TooltipTrigger type="button" className={triggerClassName}>
          {children}
        </TooltipTrigger>
        {label && <TooltipContent {...props}>{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
