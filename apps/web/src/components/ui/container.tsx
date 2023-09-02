import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Container: React.FC<ContainerProps> = ({ className, ...props }) => {
  return <div className={cn('p-6', className)} {...props} />;
};

export default Container;
