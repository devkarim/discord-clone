import { ServerWithMembersCount } from '@/types/db';

import ServerCard from './server-card';

interface ServerCardsListProps {
  title?: string;
  servers: ServerWithMembersCount[];
}

const ServerCardsList: React.FC<ServerCardsListProps> = ({
  title,
  servers,
}) => {
  return (
    <div className="space-y-4">
      {title && <h1 className="text-xl font-semibold">{title}</h1>}
      <div className="flex flex-wrap gap-6">
        {servers.map((s) => (
          <ServerCard
            key={s.id}
            name={s.name}
            imageUrl={s.imageUrl}
            inviteCode={s.inviteCode}
            membersCount={s._count.members}
          />
        ))}
      </div>
      {servers.length == 0 && (
        <p className="text-foreground/60">No servers found.</p>
      )}
    </div>
  );
};

export default ServerCardsList;
