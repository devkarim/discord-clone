import { cn } from '@/lib/utils';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Content: React.FC<ContentProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'h-full flex-grow overflow-auto px-2 pt-4 space-y-3',
        className
      )}
      {...props}
    />
  );
};

export default Content;
