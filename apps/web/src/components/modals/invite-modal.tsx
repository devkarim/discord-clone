'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { CheckIcon, CopyIcon, RefreshCcw } from 'lucide-react';

import { Logger } from 'utils';
import { Exception } from 'models';

import useModal from '@/hooks/use-modal';
import Modal from '@/components/ui/modal';
import { APP_URL } from '@/config/constants';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateInviteCode } from '@/services/server';
import useCurrentServer from '@/hooks/use-current-server';

interface InviteModalProps {}

const InviteModal: React.FC<InviteModalProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const isOpen = useModal((state) => state.isModalOpen('invite'));
  const onOpenChange = useModal((state) => state.setOpen('invite'));
  const { data: server, refetch } = useCurrentServer();

  const inviteLink = `${APP_URL}/invite/${server?.inviteCode}`;

  const copy = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    toast.success('Copied invite link to clipboard');
  };

  const generateLink = async () => {
    if (!server) return;
    try {
      setLoading(true);
      await generateInviteCode(server.id);
      await refetch();
      toast.success('Generated a new invite link');
    } catch (err) {
      Logger.exception(err, 'register-form');
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      header={
        <p>
          Invite friends to <span className="font-bold">{server?.name}</span>
        </p>
      }
    >
      <div className="space-y-2">
        <Label>SEND AN INVITE LINK TO FRIEND</Label>
        <div className="flex items-center gap-3">
          <Input value={inviteLink} readOnly disabled={loading} />
          {isCopied ? (
            <CheckIcon />
          ) : (
            <CopyIcon className="cursor-pointer" onClick={copy} />
          )}
        </div>
      </div>
      <Button
        className="space-x-2 w-fit"
        onClick={generateLink}
        disabled={loading}
      >
        <span>Generate new link</span>{' '}
        <RefreshCcw className="h-5 w-5 inline-block" />{' '}
      </Button>
    </Modal>
  );
};

export default InviteModal;
