import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';

import { UpdateMessageSchema, updateMessageSchema } from 'models';

import { formatDate } from '@/lib/utils';
import Avatar from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MessageWithAuthor } from '@/types/db';
import ActionTooltip from '@/components/ui/action-tooltip';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

interface MessageProps {
  message: MessageWithAuthor;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<UpdateMessageSchema>({
    resolver: zodResolver(updateMessageSchema),
    defaultValues: { content: message.content },
  });

  const isLoading = form.formState.isSubmitting;

  const isEdited = message.updatedAt !== message.createdAt;

  const handleDisablingEditing = () => {
    setIsEditing(false);
    form.reset();
  };

  const saveEdit = async (data: UpdateMessageSchema) => {
    console.log(data);
    handleDisablingEditing();
  };

  const onDelete = async () => {};

  return (
    <div className="group relative flex gap-4 items-center hover:bg-sidebar/20 py-2 px-6">
      <Avatar
        src={message.author.user.imageUrl}
        name={message.author.user.username}
        alt="avatar"
        showStatus={false}
        parentClassName="w-12 h-12 select-none"
        firstLetterClassName="text-2xl group-hover:opacity-60"
      />
      <div className="w-full space-y-1">
        <div className="flex items-center gap-2 select-none">
          <p className="font-semibold">{message.author.user.username}</p>
          <p className="text-foreground/60 text-xs">
            {formatDate(message.createdAt)}
          </p>
        </div>
        <div className="w-full space-y-1">
          {isEditing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(saveEdit)}
                className="space-y-1"
              >
                <FormField
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-full"
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') handleDisablingEditing();
                            if (e.key === 'Enter')
                              saveEdit({ content: form.getValues('content') });
                          }}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-1 items-center text-xs">
                  <p>escape to</p>
                  <button
                    className="text-primary hover:underline disabled:hover:no-underline disabled:opacity-70"
                    onClick={handleDisablingEditing}
                    type="reset"
                    disabled={isLoading}
                  >
                    cancel
                  </button>
                  <p>or</p>
                  <p>enter to</p>
                  <button
                    className="text-primary hover:underline disabled:hover:no-underline disabled:opacity-70"
                    type="submit"
                    disabled={isLoading}
                  >
                    save
                  </button>
                </div>
              </form>
            </Form>
          ) : (
            <p className="break-all">
              {message.content}{' '}
              {isEdited && (
                <span className="text-foreground/60 text-[10px] select-none">
                  (edited)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      <div className="absolute -top-5 right-5 bg-background border-[0.5px] rounded-md hidden group-hover:flex shadow-md overflow-hidden">
        <ActionTooltip label="Edit" hidden={isLoading}>
          <button
            className="hover:bg-active-channel p-3 transition-colors disabled:hover:bg-transparent disabled:opacity-70"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
          >
            <FaPen />
          </button>
        </ActionTooltip>
        <ActionTooltip label="Delete" hidden={isLoading}>
          <button
            className="hover:bg-active-channel p-3 transition-colors disabled:hover:bg-transparent text-destructive disabled:opacity-70"
            onClick={onDelete}
            disabled={isLoading}
          >
            <FaTrash />
          </button>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default Message;
