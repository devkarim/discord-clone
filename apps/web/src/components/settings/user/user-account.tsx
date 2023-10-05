'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Logger } from 'utils';
import { Exception, UpdateUserSchema, updateUserSchema } from 'models';

import useUser from '@/hooks/use-user';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUser } from '@/services/user';
import ImageUpload from '@/components/ui/image-upload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import SaveChangesToast from '@/components/settings/save-changes-toast';

interface UserAccountProps {}

const UserAccount: React.FC<UserAccountProps> = ({}) => {
  const { data: user, refetch } = useUser();
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username,
      imageUrl: user?.imageUrl || '',
      name: user?.name || '',
    },
  });

  const loading = form.formState.isSubmitting;

  if (!user) return null;

  const saveChanges = async (data: UpdateUserSchema) => {
    try {
      await updateUser(data);
      setSaveChangesOpen(false);
      refetch();
      toast.success('Profile updated successfully');
    } catch (err) {
      Logger.exception(err, 'user-account');
      toast.error(Exception.parseError(err));
    } finally {
    }
  };

  const onReset = () => {
    form.reset({
      name: user.name ?? '',
      imageUrl: user.imageUrl ?? '',
      username: user.username,
    });
    updateSaveChanges();
  };

  const updateSaveChanges = () => {
    const { username, imageUrl, name } = form.getValues();
    if (imageUrl != user.imageUrl) return setSaveChangesOpen(true);
    if (name != user.name) return setSaveChangesOpen(true);
    if (username != user.username) return setSaveChangesOpen(true);
    setSaveChangesOpen(false);
  };

  return (
    <div className="py-6">
      <SaveChangesToast
        isOpen={saveChangesOpen}
        onSaveChanges={form.handleSubmit(saveChanges)}
        onReset={onReset}
        loading={loading}
      />
      <Form {...form}>
        <form onChange={updateSaveChanges}>
          <div className="space-y-8">
            <div className="flex gap-12">
              <FormField
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        imageUrl={field.value ?? user.imageUrl}
                        name={form.getValues('username') ?? user.username}
                        onUploadComplete={(url) => {
                          field.onChange(url);
                          setSaveChangesOpen(true);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="w-72">
                    <FormLabel>
                      <Label>USERNAME</Label>
                    </FormLabel>
                    <FormControl>
                      <Input value={value ?? user.username ?? ''} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="name"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel>
                    <Label>DISPLAY NAME</Label>
                  </FormLabel>
                  <FormControl>
                    <Input value={value ?? user.name ?? ''} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserAccount;
