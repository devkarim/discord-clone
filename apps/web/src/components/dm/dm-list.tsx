'use client';

import DMCard from './dm-card';

interface DMListProps {}

const DMList: React.FC<DMListProps> = ({}) => {
  return (
    <div>
      <DMCard username="Karim" />
    </div>
  );
};

export default DMList;
