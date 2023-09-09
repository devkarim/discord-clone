import { FaXmark } from '@react-icons/all-files/fa6/FaXmark';

import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  header?: React.ReactNode;
  subtitle?: string;
  className?: string;
  dense?: boolean;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  header,
  subtitle,
  className,
  dense = false,
  children,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          'max-w-[23rem] sm:max-w-lg focus:outline-none outline-none focus-visible:outline-none',
          dense && 'p-0',
          className
        )}
        overlayProps={{
          onClick: (e) => {
            if (e.target == e.currentTarget) onOpenChange(false);
          },
        }}
      >
        <AlertDialogHeader className="relative">
          <span
            className={cn(
              'self-end absolute w-fit cursor-pointer opacity-40 hover:opacity-100 transition-opacity',
              dense && 'm-4'
            )}
            onClick={() => onOpenChange(false)}
          >
            <FaXmark className="text-2xl" />
          </span>
          {title && (
            <AlertDialogTitle className="text-center font-bold text-2xl">
              {title}
            </AlertDialogTitle>
          )}
          {header}
          {subtitle && (
            <AlertDialogDescription className="text-center">
              {subtitle}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
