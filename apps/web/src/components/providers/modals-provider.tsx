import InviteModal from '@/components/modals/invite-modal';
import AddServerModal from '@/components/modals/add-server-modal';

interface ModalsProviderProps {}

const ModalsProvider: React.FC<ModalsProviderProps> = ({}) => {
  return (
    <>
      <AddServerModal />
      <InviteModal />
    </>
  );
};

export default ModalsProvider;
