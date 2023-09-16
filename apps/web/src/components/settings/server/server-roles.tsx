import RolesList from '@/components/role/roles-list';
import { Separator } from '@/components/ui/separator';
import CreateRoleForm from '@/components/role/create-role-form';

interface ServerRolesProps {}

const ServerRoles: React.FC<ServerRolesProps> = ({}) => {
  return (
    <div className="pt-2 space-y-12">
      <p className="text-foreground/60 text-sm">
        Use roles to group your server members and assign permissions.
      </p>
      <RolesList />
      <Separator />
      <CreateRoleForm />
    </div>
  );
};

export default ServerRoles;
