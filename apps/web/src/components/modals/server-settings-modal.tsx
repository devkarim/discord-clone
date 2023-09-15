'use client';

import { Tab } from '@/types/ui';
import useModal from '@/hooks/use-modal';
import useCurrentServer from '@/hooks/use-current-server';
import ServerRoles from '@/components/settings/server/server-roles';
import SettingsContainer from '@/components/settings/settings-container';
import ServerOverview from '@/components/settings/server/server-overview';

interface ServerSettingsModalProps {}

const ServerSettingsModal: React.FC<ServerSettingsModalProps> = ({}) => {
  const setOpen = useModal((state) => state.setOpen('server-settings'));
  const isOpen = useModal((state) => state.isModalOpen('server-settings'));
  const { data: server } = useCurrentServer();
  const tabs: Tab[] = [
    {
      name: 'Overview',
      title: 'Server Overview',
      content: <ServerOverview />,
    },
    {
      name: 'Roles',
      title: 'Roles',
      content: <ServerRoles />,
    },
  ];

  return (
    <SettingsContainer
      isOpen={isOpen}
      title={server?.name}
      setOpen={setOpen}
      tabs={tabs}
    />
  );
};

export default ServerSettingsModal;
