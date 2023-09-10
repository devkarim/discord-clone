import { useState } from 'react';

import { Category, Channel } from 'database';

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

import ChannelsList from './channels-list';
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
        <ChannelsList channels={category.channels} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChannelCategory;
