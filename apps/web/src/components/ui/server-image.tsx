import Image from 'next/image';

import { cn } from '@/lib/utils';

import FirstLetter from './first-letter';

interface ServerImageProps {
  imageUrl?: string | null;
  name: string;
  className?: string;
  letterClassName?: string;
}

const ServerImage: React.FC<ServerImageProps> = ({
  imageUrl,
  name,
  className,
  letterClassName,
}) => {
  return (
    <div
      className={cn(
        'relative rounded-full p-2 bg-sidebar w-12 h-12 flex items-center justify-center select-none',
        className
      )}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      ) : (
        <FirstLetter text={name} className={cn(letterClassName)} />
      )}
    </div>
  );
};

export default ServerImage;
