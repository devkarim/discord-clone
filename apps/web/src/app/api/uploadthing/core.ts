import { getUser } from '@/actions/session';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const auth = (req: Request) => getUser();

const handleAuth = async (req: Request) => {
  // This code runs on your server before upload
  const user = await auth(req);

  // If you throw, the user will not be able to upload
  if (!user) throw new Error('Unauthorized');

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: user.id };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
  attachmentUploader: f(['image', 'pdf'])
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
