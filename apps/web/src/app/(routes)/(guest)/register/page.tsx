import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Anchor from '@/components/ui/anchor';

import RegisterForm from './components/register-form';

interface RegisterPageProps {}

export const metadata: Metadata = {
  title: 'Discord Clone - Sign up',
  description: 'Create a new Discord Clone account.',
};

export default async function RegisterPage({}: RegisterPageProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-2">
      <Card className="border-0 w-full max-w-xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <RegisterForm />
          <p className="text-sm">
            <Anchor href="/login">Already have an account?</Anchor>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
