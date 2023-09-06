'use client';

import { FaPlus } from '@react-icons/all-files/fa6/FaPlus';

import useServerModal from '@/hooks/use-server-modal';
import HoverCircle from '@/components/ui/hover-circle';

interface AddServerHoverCircleProps {}

const AddServerHoverCircle: React.FC<AddServerHoverCircleProps> = ({}) => {
  const showServerModal = useServerModal((state) => state.show);
  const isOpen = useServerModal((state) => state.isOpen);

  return (
    <HoverCircle
      className="hover:bg-green-500 text-green-500"
      activeClassName="bg-green-500 text-green-500"
      showIndiaction={false}
      tooltip="Add a Server"
      onClick={showServerModal}
      active={isOpen}
    >
      <FaPlus className="text-2xl" />
    </HoverCircle>
  );
};

export default AddServerHoverCircle;
