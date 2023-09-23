import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

import FirstLetter from './first-letter';
import Indicator from './indicator';

interface AvatarProps extends Omit<ImageProps, 'src'> {
  name?: string;
  src?: string | null;
  parentClassName?: string;
  firstLetterClassName?: string;
  indicatorClassName?: string;
  status?: 'online' | 'invisible';
  showStatus?: boolean;
  isChannel?: boolean;
  children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  className,
  parentClassName,
  firstLetterClassName,
  indicatorClassName,
  status = 'invisible',
  isChannel = false,
  showStatus = true,
  children,
  ...props
}) => {
  return (
    <div className="relative">
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-sidebar w-10 h-10 rounded-full p-2',
          parentClassName
        )}
      >
        {src ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            src={src}
            className={cn('object-cover', className)}
            fill
            {...props}
          />
        ) : (
          <FirstLetter
            text={name || 'N'}
            className={cn('text-xl', firstLetterClassName)}
          />
        )}
      </div>
      {showStatus && (
        <Indicator
          className={cn(
            'absolute right-0 bottom-0 ring-4 ring-sidebar',
            isChannel && 'ring-channels',
            status == 'online' && 'bg-green-500',
            status == 'invisible' && 'bg-sidebar border-2 border-foreground/50',
            status == 'invisible' && isChannel && 'bg-channels',
            indicatorClassName
          )}
        />
      )}
      {children}
    </div>
  );
};

export default Avatar;
