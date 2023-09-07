import AddServerModal from '@/components/modals/add-server-modal';

interface ModalsProviderProps {}

const ModalsProvider: React.FC<ModalsProviderProps> = ({}) => {
  return (
    <>
      <AddServerModal />
    </>
  );
};

export default ModalsProvider;
