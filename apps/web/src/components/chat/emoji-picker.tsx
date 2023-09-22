'use client';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { EMOJIS } from '@/config/data';
import IconButton from '@/components/ui/icon-button';

interface Emoji {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}

interface EmojiPickerProps {
  onEmojiSelect?: (emoji: Emoji) => void;
  disabled?: boolean;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState<number>(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onHover = () => {
    if (isOpen) return false;
    const newIndex = emojiIndex + 1;
    setEmojiIndex(EMOJIS[newIndex] ? newIndex : 0);
  };

  return (
    <Popover onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger disabled={disabled}>
        <IconButton
          className={cn(
            'text-2xl opacity-100 text-foreground/80 hover:text-foreground/100 transition-all hover:scale-125 grayscale hover:grayscale-0',
            isOpen && 'text-foreground/100 scale-125 grayscale-0'
          )}
          onHover={onHover}
        >
          {EMOJIS[emojiIndex]}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="bg-transparent border-none shadow-none drop-shadow-none w-fit"
        sideOffset={12}
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={onEmojiSelect}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
