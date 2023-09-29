import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { FaCirclePlus } from '@react-icons/all-files/fa6/FaCirclePlus';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';

import { Category, Channel } from 'database';

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from '@/components/ui/context-menu';
import useModal from '@/hooks/use-modal';
import { handleError } from '@/lib/utils';
import { canMemberDoAction } from '@/lib/permission';
import { deleteCategory } from '@/services/category';
import useCurrentMember from '@/hooks/use-current-member';
import useCurrentServer from '@/hooks/use-current-server';
import ConfirmationModal from '@/components/modals/confirmation-modal';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

import ChannelsList from './channels-list';
import CategorySubHeader from './category-sub-header';

interface ChannelCategoryProps {
  category: Category & { channels: Channel[] };
}

const ChannelCategory: React.FC<ChannelCategoryProps> = ({ category }) => {
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { refetch } = useCurrentServer();
  const { data: member } = useCurrentMember();
  const showModal = useModal((state) => state.show);

  const hasAccess = canMemberDoAction(member, 'MANAGE_SERVER');

  const onDelete = async () => {
    if (!categoryId) return toast.error('Category not found');
    try {
      setLoading(true);
      await deleteCategory(categoryId);
      refetch();
      toast.success('Category deleted successfully!');
    } catch (err) {
      handleError(err);
    } finally {
      setCategoryId(null);
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={!!categoryId}
        onOpenChange={(open) => !open && setCategoryId(null)}
        title="Are you sure you want to delete this category?"
        subtitle="Please make sure to delete all channels in this category before deleting it. This action cannot be undone."
        loading={loading}
        onConfirm={onDelete}
      />
      <Collapsible open={!hide} onOpenChange={(open) => setHide(!open)}>
        <ContextMenu>
          <ContextMenuTrigger>
            <CategorySubHeader
              name={category.name}
              onCollapse={() => setHide(!hide)}
              isCollapsed={hide}
            />
          </ContextMenuTrigger>
          {hasAccess && (
            <ContextMenuContent>
              <ContextMenuItem
                className="justify-between gap-12 font-medium cursor-pointer"
                onClick={() =>
                  setTimeout(
                    () =>
                      showModal('create-channel', { category: category.name }),
                    100
                  )
                }
              >
                <p>Add Channel</p>
                <FaCirclePlus />
              </ContextMenuItem>
              <ContextMenuItem
                className="justify-between gap-12 font-medium cursor-pointer"
                onClick={() =>
                  setTimeout(
                    () =>
                      showModal('create-category', {
                        currentCategory: category,
                      }),
                    100
                  )
                }
              >
                <p>Edit Category</p>
                <FaPen />
              </ContextMenuItem>
              <ContextMenuItem
                className="justify-between gap-12 font-medium text-red-500 focus:text-foreground focus:bg-red-500 cursor-pointer"
                onClick={() =>
                  setTimeout(() => setCategoryId(category.id), 100)
                }
              >
                <p>Delete Category</p>
                <FaTrash />
              </ContextMenuItem>
            </ContextMenuContent>
          )}
        </ContextMenu>
        <CollapsibleContent>
          <ChannelsList channels={category.channels} />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ChannelCategory;
