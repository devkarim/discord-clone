import { cn } from '@/lib/utils';

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatContainer: React.FC<ChatContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex h-full overflow-auto scrollbar-thin scrollbar-track-channels scrollbar-thumb-black/30 scrollbar-thumb-rounded-full',
        className
      )}
      {...props}
    />
  );
};

export default ChatContainer;
