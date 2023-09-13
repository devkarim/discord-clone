import { Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';

import { useUploadThing } from '@/lib/uploadthing';

import ServerImage from './server-image';

interface ImageUploadProps {
  imageUrl?: string | null;
  name: string;
  onUploadComplete: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUrl,
  onUploadComplete,
  name,
}) => {
  const [loading, setLoading] = useState(false);
  const inputFile = useRef<React.ElementRef<'input'>>(null);

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      setLoading(false);
      if (!res) return;
      const file = res[0];
      onUploadComplete(file.url);
    },
    onUploadError: (e) => {
      console.error(e);
      setLoading(false);
    },
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return false;
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    startUpload([file]);
    setLoading(true);
  };

  return (
    <ServerImage
      imageUrl={!loading ? imageUrl : undefined}
      name={name}
      className="w-28 h-28 cursor-pointer"
      letterClassName="text-5xl"
      onClick={() => inputFile.current?.click()}
    >
      {loading && (
        <div className="absolute flex flex-col gap-2 items-center justify-center w-full h-full bg-sidebar z-10">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-xs">Uploading</p>
        </div>
      )}
      {!loading && (
        <div className="absolute opacity-0 bg-sidebar/70 flex items-center justify-center h-full w-full hover:opacity-100 z-10">
          <p className="text-xs font-semibold text-center">
            CHANGE <br />
            ICON
          </p>
          <input
            hidden
            ref={inputFile}
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={onInputChange}
          />
        </div>
      )}
    </ServerImage>
  );
};

export default ImageUpload;
