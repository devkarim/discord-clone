import { FullMember } from '@/types/db';

import MembersList from './members-list';

interface MemberRoleListProps {
  memberRoles: Record<string, FullMember[]>;
}

const MemberRoleList: React.FC<MemberRoleListProps> = ({ memberRoles }) => {
  return (
    <div className="py-6 px-4 h-full space-y-12 select-none">
      {Object.keys(memberRoles).map((roleName) => (
        <div key={roleName} className="space-y-4">
          <h1 className="text-foreground/60 font-medium uppercase text-sm">
            {roleName} ─ {memberRoles[roleName].length}
          </h1>
          <MembersList members={memberRoles[roleName]} />
        </div>
      ))}
    </div>
  );
};

export default MemberRoleList;
