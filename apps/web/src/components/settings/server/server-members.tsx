import { Skeleton } from '@/components/ui/skeleton';
import useCurrentMembers from '@/hooks/use-current-members';
import ServerMembersList from '@/components/member/server-members-list';

interface ServerMembersProps {}

const ServerMembers: React.FC<ServerMembersProps> = ({}) => {
  const { isLoading, data: members } = useCurrentMembers();

  if (isLoading)
    return (
      <div>
        <Skeleton className="w-full my-6 h-64" />
      </div>
    );

  return (
    <div className="space-y-6">
      <p className="text-foreground/60 text-sm pt-2">
        Manage your server members here.
      </p>
      {members && members.length !== 0 ? (
        <ServerMembersList members={members} />
      ) : (
        <p className="text-center text-foreground/60">No members found.</p>
      )}
    </div>
  );
};

export default ServerMembers;
