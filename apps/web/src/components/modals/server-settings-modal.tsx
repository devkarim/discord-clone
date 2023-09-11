'use client';

import { Tab } from '@/types/ui';
import useModal from '@/hooks/use-modal';
import useCurrentServer from '@/hooks/use-current-server';
import ServerOverview from '@/components/settings/server/server-overview';
import SettingsContainer from '@/components/settings/settings-container';

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
