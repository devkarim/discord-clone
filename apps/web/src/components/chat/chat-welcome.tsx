import Hashtag from '../ui/hashtag';

interface ChatWelcomeProps {
  name: string;
  isChannel?: boolean;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  name,
  isChannel = false,
}) => {
  return (
    <div className="space-y-4 select-none">
      <div className="p-4 rounded-full bg-foreground/5 w-fit h-fit">
        <Hashtag className="text-5xl" />
      </div>
      <h1 className="font-bold text-3xl">Welcome to {name}!</h1>
      <p className="text-foreground/60">
        This is the start of {name} {isChannel ? 'channel' : 'conversation'}.
      </p>
    </div>
  );
};

export default ChatWelcome;
