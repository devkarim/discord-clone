import { Skeleton } from '@/components/ui/skeleton';
import useCurrentMembers from '@/hooks/use-current-members';
import ServerMembersList from '@/components/member/server-members-list';

interface ServerMembersProps {}

const ServerMembers: React.FC<ServerMembersProps> = ({}) => {
  const { data: members } = useCurrentMembers();

  if (!members)
    return (
      <div>
        <Skeleton className="w-full h-64" />
      </div>
    );

  return (
    <div className="space-y-6">
      <p className="text-foreground/60 text-sm pt-2">
        Manage your server members here.
      </p>
      <ServerMembersList members={members} />
    </div>
  );
};

export default ServerMembers;
