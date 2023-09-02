import { redirect } from 'next/navigation';

import { getUser } from '@/actions/session';
import MainSidebar from '@/components/sidebar/main-siderbar';

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect('/login');

  return <MainSidebar user={user}>{children}</MainSidebar>;
}
