import { redirect } from 'next/navigation';

import { getUser } from '@/actions/session';
import MainSidebar from '@/components/sidebar/main-siderbar';
import AddServerModal from '@/components/modals/add-server-modal';

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect('/login');

  return (
    <>
      <AddServerModal />
      <MainSidebar user={user}>{children}</MainSidebar>
    </>
  );
}
