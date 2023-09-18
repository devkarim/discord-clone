import { FullMember } from '@/types/db';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

import ServerMemberRow from './server-member-row';

interface ServerMembersListProps {
  members: FullMember[];
}

const ServerMembersList: React.FC<ServerMembersListProps> = ({ members }) => {
  return (
    <Table className="select-none">
      <TableHeader>
        <TableRow header>
          <TableHead>MEMBERS ─ {members.length}</TableHead>
          <TableHead>ROLE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <ServerMemberRow key={member.id} member={member} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ServerMembersList;
