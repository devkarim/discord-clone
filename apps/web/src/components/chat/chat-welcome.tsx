import Avatar from '@/components/ui/avatar';
import Hashtag from '@/components/ui/hashtag';

interface ChatWelcomeProps {
  name: string;
  imageUrl?: string | null;
  username?: string;
  isChannel?: boolean;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  name,
  imageUrl,
  username,
  isChannel = false,
}) => {
  return (
    <div className="space-y-4 select-none px-6 pt-16">
      {isChannel ? (
        <div className="p-4 rounded-full bg-foreground/5 w-fit h-fit">
          <Hashtag className="text-5xl" />
        </div>
      ) : (
        <Avatar
          name={name}
          src={imageUrl}
          alt="profile-pic"
          parentClassName="w-16 h-16"
          firstLetterClassName="text-4xl"
          showStatus={false}
        />
      )}
      <h1 className="font-bold text-3xl">
        {isChannel ? `Welcome to ${name}!` : name}
      </h1>
      {username && <h2 className="font-medium text-xl">{username}</h2>}
      <p className="text-foreground/60">
        {isChannel
          ? `This is the start of ${name} channel.`
          : `This is the very beginning of your direct message history with ${name}.`}
      </p>
    </div>
  );
};

export default ChatWelcome;
