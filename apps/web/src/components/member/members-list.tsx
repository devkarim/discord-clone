import { FullMember } from '@/types/db';
import Avatar from '@/components/ui/avatar';

interface MembersListProps {
  members: FullMember[];
}

const MembersList: React.FC<MembersListProps> = ({ members }) => {
  return (
    <div>
      {members.map((member) => (
        <div key={member.id} className="flex items-center space-x-2">
          <Avatar alt="member-image" name={member.user.username} isChannel />
          <p className="text-foreground/60">{member.user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default MembersList;
