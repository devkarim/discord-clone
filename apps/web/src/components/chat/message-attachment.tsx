import Image from 'next/image';
import { FaFilePdf } from '@react-icons/all-files/fa/FaFilePdf';

interface MessageAttachmentProps {
  fileUrl: string;
}

const MessageAttachment: React.FC<MessageAttachmentProps> = ({ fileUrl }) => {
  const fileType = fileUrl.split('.').pop();

  if (fileType == 'pdf')
    return (
      <a
        href={fileUrl}
        target="_blank"
        className="flex gap-2 border-[0.5px] w-72 p-3 bg-sidebar/60 rounded-md"
      >
        <FaFilePdf className="text-5xl" />
        <div>
          <p className="text-primary">PDF file</p>
        </div>
      </a>
    );

  return (
    <div className="relative h-60 w-60">
      <Image src={fileUrl} alt="attachment" fill className="object-cover" />
    </div>
  );
};

export default MessageAttachment;
