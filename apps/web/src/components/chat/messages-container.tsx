import { cn } from '@/lib/utils';

interface MessagesContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col-reverse gap-3', className)} {...props} />
  );
};

export default MessagesContainer;
