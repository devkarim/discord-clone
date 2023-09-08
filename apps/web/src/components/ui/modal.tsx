import { FaXmark } from '@react-icons/all-files/fa6/FaXmark';

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
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  header,
  subtitle,
  children,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[23rem] sm:max-w-lg focus:outline-none outline-none focus-visible:outline-none">
        <AlertDialogHeader className="relative">
          <span
            className="self-end absolute w-fit cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
            onClick={() => onOpenChange(false)}
          >
            <FaXmark className="text-2xl" />
          </span>
          {title && (
            <AlertDialogTitle className="text-center font-bold text-2xl">
              {title}
            </AlertDialogTitle>
          )}
          {subtitle && (
            <AlertDialogDescription className="text-center">
              {subtitle}
            </AlertDialogDescription>
          )}
          {header}
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
