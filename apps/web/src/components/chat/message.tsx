import { MessageWithAuthor } from '@/types/db';
import Avatar from '../ui/avatar';

interface MessageProps {
  message: MessageWithAuthor;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="flex gap-4 items-center hover:bg-sidebar/20 py-2 px-6">
      <Avatar
        src={message.author.user.imageUrl}
        name={message.author.user.username}
        alt="avatar"
        showStatus={false}
        parentClassName="w-12 h-12 select-none"
        firstLetterClassName="text-2xl"
      />
      <div>
        <div className="flex select-none">
          <p className="font-semibold">{message.author.user.username}</p>
        </div>
        <div>
          <p className="break-all">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
