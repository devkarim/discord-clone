'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Logger } from 'utils';
import {
  CreateServerSchema,
  Exception,
  JoinServerSchema,
  createServerSchema,
  joinServerSchema,
} from 'models';

import Modal from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useServerModal from '@/hooks/use-server-modal';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { createServer } from '@/services/server';

interface AddServerModalProps {}

const AddServerModal: React.FC<AddServerModalProps> = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isOpen = useServerModal((state) => state.isOpen);
  const onOpenChange = useServerModal((state) => state.setOpen);

  const createForm = useForm<CreateServerSchema>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      name: '',
      inviteCode: '',
    },
  });

  const joinForm = useForm<JoinServerSchema>({
    resolver: zodResolver(joinServerSchema),
    defaultValues: {
      inviteCode: '',
    },
  });

  const onSubmit = async (data: CreateServerSchema | JoinServerSchema) => {
    setLoading(true);
    try {
      console.log(data);
      if ('name' in data) {
        await create(data);
      } else {
        await join(data);
      }
      router.refresh();
      onOpenChange(false);
    } catch (err) {
      Logger.exception(err, 'server-modal-form');
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: CreateServerSchema) => {
    const server = await createServer(data);
    console.log(server);
    toast.success("You've successfully created a server!");
  };

  const join = async (data: JoinServerSchema) => {
    toast.success("You've successfully joined the server!");
  };

  useEffect(() => {
    if (!isOpen) {
      createForm.reset();
      joinForm.reset();
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Add a server"
      subtitle="Hang out with your friends here. Create or join a server to get started!"
    >
      <div>
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={createForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SERVER NAME</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your server name here"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={createForm.control}
              name="inviteCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>INVITE CODE</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your server invite code here"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create a Server
            </Button>
          </form>
        </Form>
      </div>
      <Separator className="my-2" />
      <div className="space-y-3">
        <p className="text-center font-bold">Have an invite already?</p>
        <Form {...joinForm}>
          <form
            onSubmit={joinForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={joinForm.control}
              name="inviteCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>INVITE CODE</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your server invite code here"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Join a Server
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default AddServerModal;
