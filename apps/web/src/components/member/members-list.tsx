import { FullMember } from '@/types/db';
import Avatar from '@/components/ui/avatar';

interface MembersListProps {
  members: FullMember[];
}

const MembersList: React.FC<MembersListProps> = ({ members }) => {
  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center space-x-3">
          <Avatar
            alt="member-image"
            src={member.user.imageUrl}
            name={member.user.username}
            status={member.user.status}
            isChannel
          />
          <p
            className="text-foreground/60 font-medium"
            style={{ color: member.role?.color }}
          >
            {member.user.name || member.user.username}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MembersList;
