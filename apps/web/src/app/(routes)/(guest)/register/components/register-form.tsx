'use client';

import { Logger } from 'utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema, Exception } from 'models';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { register } from '@/services/auth';

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    try {
      await register(data);
      toast.success(
        'Created an account successfully! Please log into the new account.'
      );
      router.push('/login');
      router.refresh();
    } catch (err) {
      Logger.exception(err, 'register-form');
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMAIL</FormLabel>
              <FormControl>
                <Input type="email" disabled={loading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>USERNAME</FormLabel>
              <FormControl>
                <Input type="text" disabled={loading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PASSWORD</FormLabel>
              <FormControl>
                <Input type="password" disabled={loading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Button type="submit" className="w-full" loading={loading}>
            Create
          </Button>
          <p className="text-xs">
            <span className="opacity-40">
              By registering, you agree to Discord Clone&apos;s{' '}
            </span>
            <span className="text-primary cursor-pointer hover:underline">
              Terms of Service
            </span>{' '}
            <span className="opacity-40">and</span>{' '}
            <span className="text-primary cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
