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

import LoginForm from './components/login-form';

interface LoginPageProps {}

export const metadata: Metadata = {
  title: 'Discord Clone - Login',
  description: 'Log into your Discord Clone account.',
};

export default async function LoginPage({}: LoginPageProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-2">
      <Card className="border-0 w-full max-w-xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>We're so excited to see you again!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <LoginForm />
          <p className="text-sm">
            <span className="opacity-50">Need an account?</span>{' '}
            <Anchor href="/register">Register</Anchor>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
