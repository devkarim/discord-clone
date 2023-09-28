'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiSolidPlusCircle } from '@react-icons/all-files/bi/BiSolidPlusCircle';

import { SendMessageSchema, SocketResponse, sendMessageSchema } from 'models';

import { handleError } from '@/lib/utils';
import useSocket from '@/hooks/use-socket';
import { Input } from '@/components/ui/input';
import IconButton from '@/components/ui/icon-button';
import usePendingMessages from '@/hooks/use-pending-messages';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import CreateAttachmentModal from '@/components/modals/create-attachment-modal';

import EmojiPicker from './emoji-picker';
import useCurrentMember from '@/hooks/use-current-member';

interface ChatBoxProps {
  chatId: number;
  name: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, name }) => {
  const socket = useSocket((state) => state.socket);
  const { data: member } = useCurrentMember();
  const addPendingMessage = usePendingMessages((state) => state.addMessage);
  const [isCreateAttachmentOpen, setCreateAttachmentOpen] = useState(false);
  const form = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      content: '',
    },
  });

  const loading = form.formState.isSubmitting;

  const sendMessage = async (values: SendMessageSchema) => {
    if (!socket || !socket.active)
      return toast.error('Socket is not connected');
    if (!member) return toast.error('You are not a member of this chat');
    try {
      const response: SocketResponse<{ pendingMessageId: string }> =
        await socket.timeout(3000).emitWithAck('message', chatId, values);
      if (!response.success) {
        return toast.error(response.message);
      }
      const createdAt = new Date();
      const { pendingMessageId } = response.data;
      addPendingMessage({
        pendingMessageId,
        authorId: member.id,
        author: {
          ...member,
        },
        channelId: chatId,
        createdAt,
        updatedAt: createdAt,
        deleted: false,
        content: values.content,
        fileUrl: values.fileUrl ?? null,
      });
      form.reset();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <CreateAttachmentModal
        isOpen={isCreateAttachmentOpen}
        onOpenChange={setCreateAttachmentOpen}
        onComplete={(url) => {
          setCreateAttachmentOpen(false);
          setTimeout(() => sendMessage({ content: url, fileUrl: url }), 100);
        }}
      />
      <Form {...form}>
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
    </>
  );
};

export default ChatBox;
