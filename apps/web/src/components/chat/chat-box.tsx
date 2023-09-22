'use client';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiSolidPlusCircle } from '@react-icons/all-files/bi/BiSolidPlusCircle';

import { Channel } from 'database';
import { Exception, SendMessageSchema, sendMessageSchema } from 'models';

import { Input } from '@/components/ui/input';
import { createMessage } from '@/services/message';
import IconButton from '@/components/ui/icon-button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import EmojiPicker from './emoji-picker';

interface ChatBoxProps {
  channel?: Channel | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ channel }) => {
  const form = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      content: '',
    },
  });

  const loading = form.formState.isSubmitting;

  const sendMessage = async (values: SendMessageSchema) => {
    if (!channel) return;
    try {
      await createMessage(channel.id, values);
      form.reset();
    } catch (err) {
      toast.error(Exception.parseError(err));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendMessage)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-3 items-center m-6 bg-foreground/5 py-2 px-4 rounded-xl">
                  <IconButton className="text-3xl" disabled={loading}>
                    <BiSolidPlusCircle />
                  </IconButton>
                  <Input
                    disabled={loading}
                    type="text"
                    autoComplete="off"
                    className="border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:font-light placeholder:text-base placeholder:tracking-wider"
                    placeholder={`Message ${channel ? '#' + channel.name : ''}`}
                    {...field}
                  />
                  <EmojiPicker
                    disabled={loading}
                    onEmojiSelect={(emoji) =>
                      field.onChange(field.value + emoji.native)
                    }
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatBox;
