'use client';

import '@livekit/components-styles';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';

import useUser from '@/hooks/use-user';
import { handleError } from '@/lib/utils';
import Conference from './conference';

interface MediaRoomProps {
  chatId: number;
  video?: boolean;
  voice?: boolean;
}

const MediaRoom: React.FC<MediaRoomProps> = ({ chatId, video, voice }) => {
  const { data: user } = useUser();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchToken = async () => {
      try {
        const res = await fetch(
          `/api/livekit?room=${chatId}&username=${user.username}`
        );
        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        handleError(err);
      }
    };

    fetchToken();
  }, [user, chatId]);

  if (!token) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center text-foreground/60 gap-2">
        <Loader2 className="h-7 w-7 animate-spin" />
        <p className="text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      video={video}
      audio={voice}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
    >
      <Conference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
