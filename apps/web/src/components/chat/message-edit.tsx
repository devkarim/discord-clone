import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UpdateMessageSchema, updateMessageSchema } from 'models';

import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

interface MessageEditProps {
  onSaveEdit: (data: UpdateMessageSchema) => void;
  onCancelEdit: () => void;
  content: string;
  disabled?: boolean;
}

const MessageEdit: React.FC<MessageEditProps> = ({
  onSaveEdit,
  onCancelEdit,
  content,
  disabled,
}) => {
  const form = useForm<UpdateMessageSchema>({
    resolver: zodResolver(updateMessageSchema),
    defaultValues: { content },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSaveEdit)} className="space-y-1">
        <FormField
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') onCancelEdit();
                  }}
                  disabled={disabled}
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
            onClick={onCancelEdit}
            type="reset"
            disabled={disabled}
          >
            cancel
          </button>
          <p>or</p>
          <p>enter to</p>
          <button
            className="text-primary hover:underline disabled:hover:no-underline disabled:opacity-70"
            type="submit"
            disabled={disabled}
          >
            save
          </button>
        </div>
      </form>
    </Form>
  );
};

export default MessageEdit;
