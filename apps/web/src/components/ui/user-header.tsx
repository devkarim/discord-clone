'use client';

import { FaVideo } from '@react-icons/all-files/fa6/FaVideo';
import { FaPhoneVolume } from '@react-icons/all-files/fa6/FaPhoneVolume';

import useConversationMedia from '@/hooks/use-conversation-media';
import useCurrentConversation from '@/hooks/use-current-conversation';

import Avatar from './avatar';
import { Skeleton } from './skeleton';
import IconButton from './icon-button';

interface UserHeaderProps {}

const UserHeader: React.FC<UserHeaderProps> = ({}) => {
  const conversationMedia = useConversationMedia();
  const { data } = useCurrentConversation();

  if (!data) return <Skeleton className="h-full w-full" />;

  const onVoiceCall = () => {
    const newVoice = !conversationMedia.isVoice;
    conversationMedia.setVideo(false);
    conversationMedia.setVoice(newVoice);
    if (newVoice) {
      conversationMedia.setConversationId(data.conversation.id);
    } else {
      conversationMedia.setConversationId(null);
    }
  };

  const onVideoCall = () => {
    const newVideo = !conversationMedia.isVideo;
    conversationMedia.setVoice(false);
    conversationMedia.setVideo(newVideo);
    conversationMedia.setConversationId(data.conversation.id);
    if (newVideo) {
      conversationMedia.setConversationId(data.conversation.id);
    } else {
      conversationMedia.setConversationId(null);
    }
  };

  return (
    <div className="flex w-full px-2 justify-between">
      <div className="flex gap-3 items-center">
        <Avatar
          name={data.user.name || data.user.username}
          status={data.user.status}
          alt="user-header"
          parentClassName="h-8 w-8"
          firstLetterClassName="text-base"
          indicatorClassName="ring-2 w-[0.7rem] h-[0.7rem]"
        />
        <p className="font-semibold">{data.user.name || data.user.username}</p>
      </div>
      <div className="flex gap-6 text-xl">
        <IconButton
          tooltip="Start Voice Call"
          side="bottom"
          onClick={onVoiceCall}
        >
          <FaPhoneVolume />
        </IconButton>
        <IconButton
          tooltip="Start Video Call"
          side="bottom"
          onClick={onVideoCall}
        >
          <FaVideo />
        </IconButton>
      </div>
    </div>
  );
};

export default UserHeader;
