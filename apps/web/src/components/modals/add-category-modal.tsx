'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Logger } from 'utils';
import { CreateCategorySchema, Exception, createCategorySchema } from 'models';

import useModal from '@/hooks/use-modal';
import Modal from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { AlertDialogTitle } from '@/components/ui/alert-dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { createCategory } from '@/services/category';
import useCurrentServer from '@/hooks/use-current-server';

interface AddCategoryModalProps {}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({}) => {
  const isOpen = useModal((state) => state.isModalOpen('create-category'));
  const setOpen = useModal((state) => state.setOpen('create-category'));
  const [loading, setLoading] = useState(false);
  const { data: server, refetch } = useCurrentServer();
  const router = useRouter();
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [form, isOpen]);

  const onSubmit = async (data: CreateCategorySchema) => {
    if (!server) return;
    try {
      setLoading(true);
      await createCategory(server.id, data);
      refetch();
      toast.success('Category created successfully!');
      setOpen(false);
    } catch (err) {
      Logger.exception(err, 'add-category-modal');
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setOpen}
      header={
        <AlertDialogTitle className="pt-4 px-4">
          Create Category
        </AlertDialogTitle>
      }
      dense
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-4 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CATEGORY NAME</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="bg-card/20 p-4">
            <div className="space-x-4 ml-auto w-fit">
              <Button
                type="button"
                variant="link"
                className="text-foreground"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Create Category
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
