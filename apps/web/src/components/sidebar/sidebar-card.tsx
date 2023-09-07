import { cn } from '@/lib/utils';

interface SidebarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const SidebarCard: React.FC<SidebarCardProps> = ({
  active,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 relative w-full hover:bg-active-channel/50 p-2 transition-colors rounded-md cursor-pointer group',
        active && 'bg-active-channel',
        className
      )}
      {...props}
    />
  );
};

export default SidebarCard;
