import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

interface AnchorProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}

const Anchor: React.FC<AnchorProps> = ({ className, children, ...props }) => {
  return (
    <Link
      className={cn('font-medium text-primary hover:underline', className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Anchor;
