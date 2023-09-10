'use client';

import { useRef } from 'react';
import { BiSolidPlusCircle } from '@react-icons/all-files/bi/BiSolidPlusCircle';

import { Channel } from 'database';

import { Input } from '@/components/ui/input';
import IconButton from '@/components/ui/icon-button';

import EmojiPicker from './emoji-picker';

interface ChatBoxProps {
  channel?: Channel | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ channel }) => {
  const chatInput = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-3 items-center m-6 bg-foreground/5 py-2 px-4 rounded-xl">
      <IconButton className="text-3xl">
        <BiSolidPlusCircle />
      </IconButton>
      <Input
        ref={chatInput}
        className="border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:font-light placeholder:text-base placeholder:tracking-wider"
        placeholder={`Message ${channel ? '#' + channel.name : ''}`}
      />
      <EmojiPicker
        onEmojiSelect={(emoji) => {
          if (!chatInput.current) return;
          chatInput.current.value += emoji.native;
        }}
      />
    </div>
  );
};

export default ChatBox;
