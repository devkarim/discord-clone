'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiSolidPlusCircle } from '@react-icons/all-files/bi/BiSolidPlusCircle';

import { Exception, SendMessageSchema, sendMessageSchema } from 'models';

import { Input } from '@/components/ui/input';
import { createMessage } from '@/services/message';
import IconButton from '@/components/ui/icon-button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import CreateAttachmentModal from '@/components/modals/create-attachment-modal';

import EmojiPicker from './emoji-picker';

interface ChatBoxProps {
  chatId: number;
  name: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, name }) => {
  const [isCreateAttachmentOpen, setCreateAttachmentOpen] = useState(false);
  const form = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      content: '',
    },
  });

  const loading = form.formState.isSubmitting;

  const sendMessage = async (values: SendMessageSchema) => {
    try {
      await createMessage(chatId, values);
      form.reset();
    } catch (err) {
      toast.error(Exception.parseError(err));
    }
  };

  return (
    <Form {...form}>
      <CreateAttachmentModal
        isOpen={isCreateAttachmentOpen}
        onOpenChange={setCreateAttachmentOpen}
        onClientUploadComplete={(url) =>
          sendMessage({ content: url, fileUrl: url })
        }
      />
      <form onSubmit={form.handleSubmit(sendMessage)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-3 items-center m-6 bg-foreground/5 py-2 px-4 rounded-xl">
                  <IconButton
                    className="text-3xl"
                    disabled={loading}
                    onClick={() => setCreateAttachmentOpen(true)}
                  >
                    <BiSolidPlusCircle />
                  </IconButton>
                  <Input
                    disabled={loading}
                    type="text"
                    autoComplete="off"
                    className="border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:font-light placeholder:text-base placeholder:tracking-wider"
                    placeholder={`Message ${name}`}
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
