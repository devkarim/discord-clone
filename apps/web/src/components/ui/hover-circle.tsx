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
  active?: boolean;
}

const HoverCircle: React.FC<HoverCircleProps> = ({
  parentClassName,
  className,
  tooltip,
  showIndiaction = true,
  active,
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
                { 'rounded-2xl bg-primary text-foreground': active },
                className
              )}
              {...props}
            />
            {showIndiaction && (
              <span
                className={cn(
                  'absolute top-1/3 -left-[1rem] rounded-xl h-8 scale-y-0 bg-foreground peer-hover:scale-y-110 -translate-x-2 peer-hover:translate-x-0 w-4 transition-[transform] duration-300',
                  { 'scale-y-110 translate-x-0': active }
                )}
              ></span>
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
