import { Skeleton } from '@/components/ui/skeleton';
import useCurrentBans from '@/hooks/use-current-bans';
import BannedList from '@/components/member/banned-list';

interface ServerBannedListProps {}

const ServerBannedList: React.FC<ServerBannedListProps> = ({}) => {
  const { isLoading, data: users } = useCurrentBans();

  if (isLoading)
    return (
      <div>
        <Skeleton className="w-full my-6 h-64" />
      </div>
    );

  return (
    <div className="space-y-6">
      <p className="text-foreground/60 text-sm pt-2">
        Manage your server bans here.
      </p>
      {users && users.length !== 0 ? (
        <BannedList users={users} />
      ) : (
        <p className="text-center text-foreground/60">No banned users found.</p>
      )}
    </div>
  );
};

export default ServerBannedList;
