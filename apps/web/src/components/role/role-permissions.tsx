'use client';

import { PermissionType } from 'database';

import { Switch } from '@/components/ui/switch';
import { FormControl } from '@/components/ui/form';
import { PERMISSION_DESCRIPTIONS } from '@/config/data';

interface RolePermissionsProps {
  value?: PermissionType[];
  onChange: (value: PermissionType[]) => void;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-8">
      {Object.keys(PERMISSION_DESCRIPTIONS).map((p) => (
        <div
          key={p}
          className="flex items-center w-full gap-8 justify-between border-b border-foreground/10 py-6"
        >
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {
                PERMISSION_DESCRIPTIONS[p as Exclude<PermissionType, 'OWNER'>]
                  .name
              }
            </h3>
            <p className="text-sm text-foreground/60">
              {
                PERMISSION_DESCRIPTIONS[p as Exclude<PermissionType, 'OWNER'>]
                  .description
              }
            </p>
          </div>
          <FormControl>
            <Switch
              className="block"
              checked={!!value?.some((v) => v == p)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([...(value || []), p as PermissionType]);
                } else {
                  onChange(value?.filter((v) => v != p) || []);
                }
              }}
            />
          </FormControl>
        </div>
      ))}
    </div>
  );
};

export default RolePermissions;
