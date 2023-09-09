'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaVideo } from '@react-icons/all-files/fa6/FaVideo';
import { HiSpeakerWave } from '@react-icons/all-files/hi2/HiSpeakerWave';

import { Logger } from 'utils';
import { CreateChannelSchema, Exception, createChannelSchema } from 'models';

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
import Hashtag from '@/components/ui/hashtag';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import useCurrentServer from '@/hooks/use-current-server';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { createChannel } from '@/services/channel';
import ChannelRadioType from '@/components/channel/channel-radio-type';

interface AddChannelModalProps {}

const AddChannelModal: React.FC<AddChannelModalProps> = ({}) => {
  const isOpen = useModal((state) => state.isModalOpen('create-channel'));
  const setOpen = useModal((state) => state.setOpen('create-channel'));
  const defaultCategory = useModal((state) => state.data?.category);
  const [loading, setLoading] = useState(false);
  const { data: server, refetch } = useCurrentServer();
  const router = useRouter();
  const form = useForm<CreateChannelSchema>({
    resolver: zodResolver(createChannelSchema),
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        type: 'TEXT',
        categoryName: defaultCategory,
      });
    } else {
      form.reset();
    }
  }, [form, isOpen, defaultCategory]);

  const onSubmit = async (data: CreateChannelSchema) => {
    if (!server) return;
    try {
      setLoading(true);
      await createChannel(server.id, {
        ...data,
        categoryId: server.categories.find(
          ({ name }) => name === data.categoryName
        )?.id,
      });
      refetch();
      toast.success('Channel created successfully!');
      setOpen(false);
    } catch (err) {
      Logger.exception(err, 'add-channel-modal');
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
          Create Channel
        </AlertDialogTitle>
      }
      dense
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-4 space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>CHANNEL TYPE</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="space-y-1"
                      disabled={loading}
                    >
                      <ChannelRadioType
                        title="TEXT"
                        subtitle="Send messages, images and whatever!"
                        value="TEXT"
                        onChange={field.onChange}
                      >
                        <Hashtag className="text-2xl" />
                      </ChannelRadioType>
                      <ChannelRadioType
                        title="VOICE"
                        subtitle="Hang out with your friends on voice!"
                        value="VOICE"
                        onChange={field.onChange}
                      >
                        <HiSpeakerWave className="text-2xl" />
                      </ChannelRadioType>
                      <ChannelRadioType
                        title="VIDEO"
                        subtitle="Hang out with your friends on video!"
                        value="VIDEO"
                        onChange={field.onChange}
                      >
                        <FaVideo className="text-2xl" />
                      </ChannelRadioType>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CHANNEL NAME</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {server?.categories.length != 0 && (
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CHANNEL CATEGORY</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category to put this channel to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {server?.categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
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
                Create Channel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddChannelModal;
