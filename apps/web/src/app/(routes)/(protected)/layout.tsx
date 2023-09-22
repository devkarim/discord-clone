import { redirect } from 'next/navigation';

import { getUser } from '@/actions/session';
import MainSidebar from '@/components/sidebar/main-siderbar';
import ModalsProvider from '@/components/providers/modals-provider';
import SocketProvider from '@/components/providers/socket-provider';

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect('/login');

  return (
    <SocketProvider>
      <ModalsProvider />
      <MainSidebar user={user}>{children}</MainSidebar>
    </SocketProvider>
  );
}
