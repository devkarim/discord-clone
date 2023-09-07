import { redirect } from 'next/navigation';

import { getUser } from '@/actions/session';
import MainSidebar from '@/components/sidebar/main-siderbar';
import AddServerModal from '@/components/modals/add-server-modal';
import ModalsProvider from '@/components/providers/modals-provider';

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect('/login');

  return (
    <>
      <ModalsProvider />
      <MainSidebar user={user}>{children}</MainSidebar>
    </>
  );
}
