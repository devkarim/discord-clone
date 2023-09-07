import { FaHashtag } from '@react-icons/all-files/fa/FaHashtag';

import { cn } from '@/lib/utils';

interface HashtagProps {
  className?: string;
}

const Hashtag: React.FC<HashtagProps> = ({ className }) => {
  return <FaHashtag className={cn('text-xl', className)} />;
};

export default Hashtag;
