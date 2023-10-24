import useControl from '@/hooks/use-control';
import {
  VideoConference,
  useLocalParticipant,
} from '@livekit/components-react';
import { useEffect } from 'react';

interface ConferenceProps {}

const Conference: React.FC<ConferenceProps> = ({}) => {
  const p = useLocalParticipant();
  const { setMuted, isMuted } = useControl();

  useEffect(() => {
    p.localParticipant.setMicrophoneEnabled(!isMuted);
  }, [isMuted, p.localParticipant]);

  useEffect(() => {
    setMuted(!p.isMicrophoneEnabled);
  }, [p.isMicrophoneEnabled, setMuted]);

  return <VideoConference />;
};

export default Conference;
