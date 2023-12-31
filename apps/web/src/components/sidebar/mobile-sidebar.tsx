'use client';

import { FaBars } from '@react-icons/all-files/fa/FaBars';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

import ServerSidebar from './servers-sidebar';
import SecondarySidebar from './secondary-sidebar';

interface MobileSidebarProps {}

const MobileSidebar: React.FC<MobileSidebarProps> = ({}) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="w-10 h-10 p-2" asChild>
          <FaBars className="cursor-pointer text-2xl select-none" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex gap-0 p-0 md:hidden"
          overlayClassName="md:hidden"
        >
          <ServerSidebar />
          <SecondarySidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
