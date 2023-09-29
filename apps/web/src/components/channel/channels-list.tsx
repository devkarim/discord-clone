import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { usePathname, useRouter } from 'next/navigation';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';

import { Channel, ChannelType } from 'database';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import useModal from '@/hooks/use-modal';
import { handleError } from '@/lib/utils';
import { deleteChannel } from '@/services/channel';
import { canMemberDoAction } from '@/lib/permission';
import useCurrentMember from '@/hooks/use-current-member';
import useCurrentServer from '@/hooks/use-current-server';
import useCurrentChannel from '@/hooks/use-current-channel';
import ConfirmationModal from '@/components/modals/confirmation-modal';

import ChannelCard from './channel-card';

interface ChannelsListProps {
  channels: Channel[];
}

const ChannelsList: React.FC<ChannelsListProps> = ({ channels }) => {
  const [loading, setLoading] = useState(false);
  const [channelId, setChannelId] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: member } = useCurrentMember();
  const { data: currentChannel } = useCurrentChannel();
  const showModal = useModal((state) => state.show);
  const { data: server, refetch } = useCurrentServer();

  const hasAccess = canMemberDoAction(member, 'MANAGE_SERVER');

  const onClick = (id: number, serverId: number, type: ChannelType) => {
    if (type == ChannelType.TEXT) {
      router.push(`/server/${serverId}/channel/${id}`);
    } else {
      // TODO: Add voice & video channels support
    }
  };

  const onDelete = (id: number) => {
    setChannelId(id);
  };

  const onConfirmDelete = async () => {
    if (!channelId) return toast.error('Channel not found');
    try {
      setLoading(true);
      await deleteChannel(channelId);
      if (currentChannel && server && currentChannel.id == channelId) {
        router.push(`/server/${server?.id}`);
      }
      toast.success('Channel deleted successfully');
      refetch();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
      setChannelId(null);
    }
  };

  return (
    <>
      <ConfirmationModal
        title="Are you sure you want to delete this channel?"
        subtitle="By deleting this channel, you will lose all the messages in it. This action cannot be undone."
        isOpen={!!channelId}
        onOpenChange={(isOpen) => !isOpen && setChannelId(null)}
        onConfirm={onConfirmDelete}
        loading={loading}
      />
      {channels.map((channel) => (
        <ContextMenu key={channel.id}>
          <ContextMenuTrigger>
            <ChannelCard
              name={channel.name}
              type={channel.type}
              active={pathname.includes(`/channel/${channel.id}`)}
              onClick={() =>
                onClick(channel.id, channel.serverId, channel.type)
              }
            />
          </ContextMenuTrigger>
          {hasAccess && (
            <ContextMenuContent>
              <ContextMenuItem
                className="justify-between gap-12 font-medium cursor-pointer"
                onClick={() =>
                  setTimeout(
                    () => showModal('create-channel', { channel }),
                    100
                  )
                }
                disabled={loading}
              >
                <p>Edit Channel</p>
                <FaPen />
              </ContextMenuItem>
              <ContextMenuItem
                className="justify-between gap-12 font-medium text-red-500 focus:text-foreground focus:bg-red-500 cursor-pointer"
                onClick={() => setTimeout(() => onDelete(channel.id), 100)}
                disabled={loading}
              >
                <p>Delete Channel</p>
                <FaTrash />
              </ContextMenuItem>
            </ContextMenuContent>
          )}
        </ContextMenu>
      ))}
    </>
  );
};

export default ChannelsList;
