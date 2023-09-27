'use client';

import Modal from '@/components/ui/modal';
import { UploadDropzone } from '@/lib/uploadthing';

interface CreateAttachmentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClientUploadComplete: (url: string) => void;
}

const CreateAttachmentModal: React.FC<CreateAttachmentModalProps> = ({
  isOpen,
  onOpenChange,
  onClientUploadComplete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Create attachment"
    >
      <UploadDropzone
        endpoint="attachmentUploader"
        onClientUploadComplete={(res) => {
          if (!res || res.length == 0) return;
          onClientUploadComplete(res[0].url);
        }}
      />
    </Modal>
  );
};

export default CreateAttachmentModal;
