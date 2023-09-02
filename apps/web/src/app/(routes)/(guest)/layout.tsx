import { redirect } from 'next/navigation';

import { getUser } from '@/actions/session';

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user) redirect('/');

  return <>{children}</>;
}
