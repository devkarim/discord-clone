import useCurrentRoles from '@/hooks/use-current-roles';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

import RoleRow from './role-row';
import { Skeleton } from '../ui/skeleton';

interface RolesListProps {}

const RolesList: React.FC<RolesListProps> = ({}) => {
  const { isLoading, data: roles } = useCurrentRoles();

  if (isLoading)
    return (
      <div>
        <Skeleton className="w-full h-64" />
      </div>
    );

  if (!roles) return null;

  return (
    <Table className="select-none">
      <TableHeader>
        <TableRow header>
          <TableHead>ROLES ─ {roles.length}</TableHead>
          <TableHead>MEMBERS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <RoleRow key={role.id} role={role} />
        ))}
      </TableBody>
    </Table>
  );
};

export default RolesList;
