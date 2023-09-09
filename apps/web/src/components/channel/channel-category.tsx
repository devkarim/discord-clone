import { useState } from 'react';

import { Category, Channel } from 'database';

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

import ChannelCard from './channel-card';
import CategorySubHeader from './category-sub-header';

interface ChannelCategoryProps {
  category: Category & { channels: Channel[] };
}

const ChannelCategory: React.FC<ChannelCategoryProps> = ({ category }) => {
  const [hide, setHide] = useState(false);

  return (
    <Collapsible open={!hide} onOpenChange={(open) => setHide(!open)}>
      <CategorySubHeader
        name={category.name}
        onCollapse={() => setHide(!hide)}
        isCollapsed={hide}
      />
      <CollapsibleContent>
        {category.channels.map((channel) => (
          <ChannelCard
            key={channel.id}
            name={channel.name}
            type={channel.type}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChannelCategory;
