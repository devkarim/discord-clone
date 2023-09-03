import { cn } from '@/lib/utils';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './tooltip';

interface HoverCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  parentClassName?: string;
  showIndiaction?: boolean;
  tooltip?: React.ReactNode;
}

const HoverCircle: React.FC<HoverCircleProps> = ({
  parentClassName,
  className,
  tooltip,
  showIndiaction = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-2 flex items-center justify-center relative',
        parentClassName
      )}
    >
      <TooltipProvider>
        <Tooltip delayDuration={0} disableHoverableContent>
          <TooltipTrigger>
            <div
              className={cn(
                'flex flex-col justify-center items-center relative overflow-hidden peer h-16 w-16 bg-background hover:bg-primary hover:text-foreground rounded-[32px] hover:rounded-2xl transition-all cursor-pointer duration-300',
                className
              )}
              {...props}
            />
            {showIndiaction && (
              <span className="absolute top-1/3 -left-[1rem] rounded-xl h-8 scale-y-0 bg-foreground peer-hover:scale-y-110 -translate-x-2 peer-hover:translate-x-0 w-4 transition-[transform] duration-300"></span>
            )}
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent sideOffset={12} side="right" className="text-md">
              {tooltip}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HoverCircle;
