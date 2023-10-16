'use client';

import { useEffect, useRef, useState } from 'react';

import ChatWelcome from './chat-welcome';

interface ChatMessagesProps {
  name: string;
  username?: string;
  imageUrl?: string | null;
  isChannel?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  currentPageCount?: number;
  children?: React.ReactNode;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  name,
  username,
  imageUrl,
  isChannel,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  currentPageCount,
  children,
}) => {
  const topDiv = useRef<React.ElementRef<'div'>>(null);
  const bottomDiv = useRef<React.ElementRef<'div'>>(null);
  const [initialized, setInitialized] = useState(false);

  const handleScrollToTop = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const element = bottomDiv.current;
    if (!element) return;
    if (initialized) return;
    setInitialized(true);
    element.scrollIntoView({ behavior: 'smooth' });
  }, [initialized, bottomDiv]);

  useEffect(() => {
    const element = topDiv.current;
    if (!element) return;
    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    if (distanceFromBottom < 350) {
      bottomDiv.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPageCount, topDiv]);

  return (
    <div
      ref={topDiv}
      className="mt-auto overflow-auto scrollbar-thin pt-8"
      onScroll={(e) => {
        if (e.currentTarget.scrollTop == 0) {
          handleScrollToTop();
        }
      }}
    >
      {isFetchingNextPage && (
        <p className="text-sm text-foreground/60 text-center font-medium pb-3">
          Loading more...
        </p>
      )}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <p
            className="text-sm text-foreground/60 font-medium cursor-pointer hover:text-foreground/90 hover:underline pb-3 w-fit"
            onClick={fetchNextPage}
          >
            Load more
          </p>
        </div>
      )}
      <div className="space-y-6">
        {!hasNextPage && (
          <ChatWelcome
            name={name}
            username={username}
            imageUrl={imageUrl}
            isChannel={isChannel}
          />
        )}
        {children}
      </div>
      <div ref={bottomDiv} />
    </div>
  );
};

export default ChatMessages;
