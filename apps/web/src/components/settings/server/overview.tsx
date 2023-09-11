import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ServerImage from '@/components/ui/server-image';
import useCurrentServer from '@/hooks/use-current-server';

interface ServerOverviewProps {}

const ServerOverview: React.FC<ServerOverviewProps> = ({}) => {
  const { data: server } = useCurrentServer();

  if (!server) return null;

  return (
    <div className="py-6">
      <div className="flex gap-12">
        <ServerImage
          imageUrl={server?.imageUrl}
          name={server?.name}
          className="w-28 h-28"
          letterClassName="text-5xl"
        />
        <div className="w-72">
          <Label>SERVER NAME</Label>
          <Input defaultValue={server.name} />
        </div>
      </div>
    </div>
  );
};

export default ServerOverview;
