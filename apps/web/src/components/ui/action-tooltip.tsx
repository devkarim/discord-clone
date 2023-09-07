import { ComponentProps } from 'react';

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from './tooltip';

interface ActionTooltipProps extends ComponentProps<typeof TooltipContent> {
  label?: React.ReactNode;
}

const ActionTooltip: React.FC<ActionTooltipProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} disableHoverableContent>
        <TooltipTrigger>{children}</TooltipTrigger>
        {label && <TooltipContent {...props}>{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
