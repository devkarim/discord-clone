'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaXmark } from '@react-icons/all-files/fa6/FaXmark';
import { FaFilePdf } from '@react-icons/all-files/fa/FaFilePdf';

import { cn } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/lib/uploadthing';

interface CreateAttachmentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onChange?: (url: string) => void;
  onComplete: (url: string) => void;
}

const CreateAttachmentModal: React.FC<CreateAttachmentModalProps> = ({
  isOpen,
  onOpenChange,
  onChange,
  onComplete,
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setUrl(null);
      setFileName(null);
    }
  }, [isOpen]);

  const fileType = url?.split('.').pop();

  const renderUploadAttachment = () => {
    if (!url)
      return (
        <UploadDropzone
          endpoint="attachmentUploader"
          onClientUploadComplete={(res) => {
            if (!res || res.length == 0) return;
            setUrl(res[0].url);
            setFileName(res[0].name);
            onChange?.(res[0].url);
          }}
          onUploadError={(error) => {
            console.log(error);
          }}
        />
      );

    return (
      <div className="flex items-center justify-center">
        <div
          className={cn('relative my-4 w-fit', fileType == 'pdf' && 'w-full')}
        >
          <button
            className="absolute -top-2 -right-2 p-2 bg-red-500 rounded-full z-10"
            onClick={() => setUrl(null)}
          >
            <FaXmark />
          </button>
          {fileType == 'pdf' ? (
            <div className="flex gap-3 w-full items-center p-2 h-24 border-[0.5px] rounded-md bg-sidebar/50">
              <FaFilePdf className="text-5xl" />
              <p>{fileName || 'PDF file'}</p>
            </div>
          ) : (
            <div className="relative w-40 h-40 rounded-md overflow-hidden">
              <Image
                src={url}
                alt="upload-attachment"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Create attachment"
    >
      {renderUploadAttachment()}
      <div className="flex gap-3 justify-end">
        <Button variant="link" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          className="w-40"
          disabled={!url}
          onClick={() => url && onComplete(url)}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
};

export default CreateAttachmentModal;
