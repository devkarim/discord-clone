import { cn } from '@/lib/utils';

interface IndicatorProps {
  className?: string;
}

const Indicator: React.FC<IndicatorProps> = ({ className }) => {
  return (
    <div className={cn('w-3 h-3 rounded-full bg-primary', className)}></div>
  );
};

export default Indicator;
