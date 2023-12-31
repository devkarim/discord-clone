'use client';

import { Tab } from '@/types/ui';
import useModal from '@/hooks/use-modal';
import UserAccount from '@/components/settings/user/user-account';
import SettingsContainer from '@/components/settings/settings-container';
import AppearanceSettings from '../settings/user/appearance';

interface UserSettingsModalProps {}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({}) => {
  const setOpen = useModal((state) => state.setOpen('user-settings'));
  const isOpen = useModal((state) => state.isModalOpen('user-settings'));
  const tabs: Tab[] = [
    {
      name: 'My Account',
      title: 'My Account',
      content: <UserAccount />,
    },
    {
      name: 'Appearance',
      title: 'Appearance',
      content: <AppearanceSettings />,
    },
  ];

  return (
    <SettingsContainer
      isOpen={isOpen}
      title={'User Settings'}
      setOpen={setOpen}
      tabs={tabs}
    />
  );
};

export default UserSettingsModal;
