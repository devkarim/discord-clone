'use client';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Logger } from 'utils';
import { Exception, CreateRoleSchema, createRoleSchema } from 'models';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { addServerRole } from '@/services/server';
import { generateRandomHexColor } from '@/lib/utils';
import useCurrentServer from '@/hooks/use-current-server';

import RolePermissions from './role-permissions';
import RoleColorPicker from './role-color-picker';
import useCurrentRoles from '@/hooks/use-current-roles';

interface CreateRoleFormProps {}

const CreateRoleForm: React.FC<CreateRoleFormProps> = ({}) => {
  const { refetch } = useCurrentRoles();
  const { data: server } = useCurrentServer();
  const [loading, setLoading] = useState(false);
  const [isMounted, setMounted] = useState(false);

  const form = useForm<CreateRoleSchema>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: '',
      color: `#${generateRandomHexColor()}`,
    },
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isMounted) return null;

  const onSubmit = async (data: CreateRoleSchema) => {
    if (!server) return;
    setLoading(true);
    try {
      await addServerRole(server.id, data);
      toast.success(`Created ${data.name} role successfully!`);
      refetch();
      form.reset({
        name: '',
        color: data.color,
      });
    } catch (err) {
      Logger.exception(err, 'create-role-form');
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="font-medium text-2xl">Create a role</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>ROLE NAME</FormLabel>
              <FormControl>
                <Input type="text" disabled={loading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>ROLE COLOR</FormLabel>
              <RoleColorPicker value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>ROLE PERMISSIONS</FormLabel>
              <RolePermissions value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button
            type="submit"
            className="w-52 ml-auto"
            variant="secondary"
            loading={loading}
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateRoleForm;
