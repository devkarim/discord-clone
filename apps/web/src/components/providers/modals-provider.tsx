import InviteModal from '@/components/modals/invite-modal';
import AddServerModal from '@/components/modals/add-server-modal';
import AddChannelModal from '@/components/modals/add-channel-modal';
import AddCategoryModal from '@/components/modals/add-category-modal';
import ServerSettingsModal from '../modals/server-settings-modal';

interface ModalsProviderProps {}

const ModalsProvider: React.FC<ModalsProviderProps> = ({}) => {
  return (
    <>
      <AddServerModal />
      <InviteModal />
      <AddChannelModal />
      <AddCategoryModal />
      <ServerSettingsModal />
    </>
  );
};

export default ModalsProvider;
