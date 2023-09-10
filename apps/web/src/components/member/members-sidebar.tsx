'use client';

import { useMemo } from 'react';

import useUI from '@/hooks/use-ui';
import { FullMember } from '@/types/db';
import useCurrentMembers from '@/hooks/use-current-members';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

import MemberRoleList from './member-role-list';

interface MembersSidebarProps {}

const MembersSidebar: React.FC<MembersSidebarProps> = ({}) => {
  const showMembersList = useUI((state) => state.isMemberSidebarOpen);
  const showMembersListMobile = useUI(
    (state) => state.isMemberSidebarMobileOpen
  );
  const setMemberSidebarOpen = useUI((state) => state.setMemberSidebarOpen);
  const setMemberSidebarMobileOpen = useUI(
    (state) => state.setMemberSidebarMobileOpen
  );
  const { data: members } = useCurrentMembers();

  const mappedRolesToMembers = useMemo(() => {
    if (!members) return {};
    return members.reduce(
      (acc, member) => {
        const roleName = member.role?.name || 'Guest';
        if (!acc[roleName]) acc[roleName] = [];
        acc[roleName].push(member);
        return acc;
      },
      {} as Record<string, FullMember[]>
    );
  }, [members]);

  if (!members) return null;

  return (
    <>
      <div className="h-full hidden md:flex">
        <Collapsible open={showMembersList} onOpenChange={setMemberSidebarOpen}>
          <CollapsibleContent className="min-h-full w-64 bg-channels">
            <MemberRoleList memberRoles={mappedRolesToMembers} />
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="h-full hidden md:flex">
        <Sheet
          open={showMembersListMobile}
          onOpenChange={setMemberSidebarMobileOpen}
        >
          <SheetContent
            className="h-full w-64 bg-channels md:hidden p-0 max-h-screen overflow-y-auto"
            overlayClassName="md:hidden"
            side="right"
          >
            <MemberRoleList memberRoles={mappedRolesToMembers} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MembersSidebar;
