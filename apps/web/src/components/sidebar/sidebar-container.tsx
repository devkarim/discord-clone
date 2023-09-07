import { cn } from '@/lib/utils';

interface SidebarContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContainer: React.FC<SidebarContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-channels h-full w-[17rem] flex flex-col select-none',
        className
      )}
      {...props}
    />
  );
};

export default SidebarContainer;
