import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ConfirmationModalProps extends React.ComponentProps<typeof Modal> {
  onConfirm: () => {};
  onCancel?: () => {};
  disabled?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  onOpenChange,
  disabled,
  title,
  ...props
}) => {
  const cancel = () => {
    if (onCancel) return onCancel();
    onOpenChange(false);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      header={
        <AlertDialogTitle className="pt-3 text-center">
          {title}
        </AlertDialogTitle>
      }
      {...props}
    >
      <div className="flex gap-3 justify-end mt-6">
        <Button onClick={onConfirm} disabled={disabled}>
          Confirm
        </Button>
        <Button onClick={cancel} variant="secondary" disabled={disabled}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
