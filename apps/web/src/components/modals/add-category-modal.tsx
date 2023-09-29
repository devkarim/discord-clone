'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateCategorySchema, createCategorySchema } from 'models';

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
import { handleError } from '@/lib/utils';
import useCurrentServer from '@/hooks/use-current-server';
import { createCategory, updateCategory } from '@/services/category';

interface AddCategoryModalProps {}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({}) => {
  const isOpen = useModal((state) => state.isModalOpen('create-category'));
  const setOpen = useModal((state) => state.setOpen('create-category'));
  const currentCategory = useModal((state) => state.data?.currentCategory);
  const [loading, setLoading] = useState(false);
  const { data: server, refetch } = useCurrentServer();
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const isEditCategory = !!currentCategory;

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: currentCategory?.name ?? '',
      });
    }
  }, [form, currentCategory, isOpen]);

  const onSubmit = async (data: CreateCategorySchema) => {
    if (!server) return;
    try {
      setLoading(true);
      if (currentCategory) {
        await updateServerCategory(data);
      } else {
        await createServerCategory(data);
      }
      refetch();
      setOpen(false);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateServerCategory = async (data: CreateCategorySchema) => {
    if (!server || !currentCategory) return;
    await updateCategory(currentCategory.id, data);
    toast.success('Category updated successfully!');
  };

  const createServerCategory = async (data: CreateCategorySchema) => {
    if (!server) return;
    await createCategory(server.id, data);
    toast.success('Category created successfully!');
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setOpen}
      header={
        <AlertDialogTitle className="pt-4 px-4">
          {isEditCategory ? 'Update' : 'Create'} Category
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
                {isEditCategory ? 'Update' : 'Create'} Category
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
