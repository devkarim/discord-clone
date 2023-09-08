'use client';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Exception } from 'models';

import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { joinServerByCode } from '@/services/server';
import useServerByInviteCode from '@/hooks/use-server-by-code';
import useClientServers from '@/hooks/use-servers';

interface InvitePageProps {
  params: {
    inviteCode: string;
  };
}

const InvitePage: React.FC<InvitePageProps> = ({ params: { inviteCode } }) => {
  const { data, isLoading } = useServerByInviteCode(inviteCode);
  const { refetch } = useClientServers();
  const [isOpen, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    if (isLoading) return;
    if (data?.isInServer) {
      router.replace(`/server/${data.server.id}`);
      toast.error('You are already a member of this server.');
      return;
    }
    if (data) return;
    router.replace('/');
    toast.error("This invite link doesn't exist.");
  }, [isLoading, router, data]);

  if (isLoading) return null;

  if (!data) return null;

  const { server, isInServer } = data;

  const joinServer = async () => {
    if (!server) return;
    try {
      setLoading(true);
      const server = await joinServerByCode(inviteCode);
      toast.success("You've joined the server!");
      router.push(`/server/${server.id}`);
      refetch();
    } catch (err) {
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      router.push('/');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`Join ${server.name}`}
      subtitle={`This is an invation to join ${server.name} server`}
    >
      <div className="flex gap-3">
        <Button
          className="w-full"
          variant="success"
          disabled={loading}
          onClick={joinServer}
        >
          Join
        </Button>
        <Button
          className="w-full"
          variant="destructive"
          disabled={loading}
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default InvitePage;
