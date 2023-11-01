'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Logger } from 'utils';
import { Exception, UpdateUserSchema, updateUserSchema } from 'models';

import useUser from '@/hooks/use-user';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { logout, updateUser } from '@/services/user';
import ImageUpload from '@/components/ui/image-upload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import useModal from '@/hooks/use-modal';
import { handleError } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SaveChangesToast from '@/components/settings/save-changes-toast';

interface UserAccountProps {}

const UserAccount: React.FC<UserAccountProps> = ({}) => {
  const hide = useModal((state) => state.hide);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: user, refetch } = useUser();
  const router = useRouter();
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username,
      imageUrl: user?.imageUrl,
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
      imageUrl: user.imageUrl,
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

  const onLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/');
      router.refresh();
      hide();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <SaveChangesToast
        isOpen={saveChangesOpen}
        onSaveChanges={form.handleSubmit(saveChanges)}
        onReset={onReset}
        loading={loading}
      />
      <div className="py-6 space-y-12">
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
                        <Input
                          value={value ?? user.username ?? ''}
                          {...field}
                        />
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
        <div className="space-y-6">
          <div className="space-y-1 text-foreground/60">
            <h2 className="font-bold text-sm">SIGN OUT</h2>
            <p className="text-sm">Log out from your account.</p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="font-semibold w-40"
            onClick={onLogout}
            loading={isLoggingOut}
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
