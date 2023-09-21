import { useState } from 'react';
import { Circle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { Exception } from 'models';

import { Button } from '@/components/ui/button';
import useClientServers from '@/hooks/use-servers';
import { joinServerByCode } from '@/services/server';
import ServerImage from '@/components/ui/server-image';

interface ServerCardProps {
  name: string;
  imageUrl: string | null;
  inviteCode: string;
  membersCount: number;
}

const ServerCard: React.FC<ServerCardProps> = ({
  name,
  imageUrl,
  inviteCode,
  membersCount,
}) => {
  const { refetch } = useClientServers();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const joinServer = async () => {
    try {
      setLoading(true);
      const server = await joinServerByCode(inviteCode);
      toast.success("You've joined the server!");
      router.push(`/server/${server.id}`);
      refetch();
    } catch (err) {
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full md:w-72 h-72 shadow-lg bg-sidebar/80 rounded-lg gap-4 flex flex-col select-none">
      <div className="space-y-2 flex flex-col">
        <ServerImage
          className="self-center w-24 h-24"
          imageUrl={imageUrl}
          name={name}
        />
        <p className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden text-center">
          {name}
        </p>
      </div>
      <div className="self-end flex items-center gap-2 mt-auto">
        <Circle fill="gray" color="gray" height={12} width={12} />
        <p className="text-foreground/60 text-xs">{membersCount} Members</p>
      </div>
      <Button className="w-full" loading={loading} onClick={joinServer}>
        Join
      </Button>
    </div>
  );
};

export default ServerCard;
