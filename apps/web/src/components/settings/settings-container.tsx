'use client';

import { FaX } from '@react-icons/all-files/fa6/FaX';

import { Tab } from '@/types/ui';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SettingsContainerProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  tabs: Tab[];
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({
  isOpen,
  setOpen,
  title,
  tabs,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent className="w-screen h-screen max-w-none sm:max-w-none flex p-0 focus:outline-none outline-none focus-visible:outline-none">
        <Tabs
          defaultValue={tabs[0].name}
          className="grid grid-cols-[33.333%_67.777%] w-full"
        >
          <TabsList className="bg-sidebar/40 flex flex-col justify-start items-end px-4 h-full space-y-2 overflow-y-auto scrollbar-thumb-sidebar scrollbar scrollbar-thumb-rounded-2xl scrollbar-w-1">
            <div className="w-52 text-foreground/70 space-y-1 py-16">
              {title && (
                <h1 className="font-medium ml-3 text-sm select-none uppercase">
                  {title}
                </h1>
              )}
              {tabs.map((tab) => (
                <TabsTrigger key={tab.name} value={tab.name}>
                  {tab.name}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
          <div className="relative py-16 px-12 pr-16 max-w-4xl overflow-auto scrollbar-none">
            <div className="absolute text-center space-y-2 right-0 text-foreground/60 select-none py-8">
              <div
                className="peer hover:bg-foreground/5 rounded-full border-2 p-3 border-foreground/60 cursor-pointer hover:text-foreground/100 transition-colors"
                onClick={() => setOpen(false)}
              >
                <FaX className="text-sm" />
              </div>
              <p className="text-sm peer-hover:text-foreground/100">ESC</p>
            </div>
            {tabs.map((tab) => (
              <TabsContent key={tab.name} value={tab.name}>
                {tab.title && (
                  <h1 className="text-2xl font-medium">{tab.title}</h1>
                )}
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsContainer;
