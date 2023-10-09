import { UserWithoutStatus } from '@/types/db';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

import BannedUserRow from './banned-user-row';

interface BannedListProps {
  users: UserWithoutStatus[];
}

const BannedList: React.FC<BannedListProps> = ({ users }) => {
  return (
    <Table className="select-none">
      <TableHeader>
        <TableRow header>
          <TableHead>BANS ─ {users.length}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <BannedUserRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};

export default BannedList;
