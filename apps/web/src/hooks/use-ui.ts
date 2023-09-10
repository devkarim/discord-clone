import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
  isMemberSidebarOpen: boolean;
  setMemberSidebarOpen: (isMemberSidebarOpen: boolean) => void;
  isMemberSidebarMobileOpen: boolean;
  setMemberSidebarMobileOpen: (isMemberSidebarMobileOpen: boolean) => void;
}

const useUI = create(
  persist(
    devtools<UIState>((set) => ({
      isMemberSidebarOpen: false,
      isMemberSidebarMobileOpen: false,
      setMemberSidebarOpen: (isMemberSidebarOpen) =>
        set({ isMemberSidebarOpen }),
      setMemberSidebarMobileOpen: (isMemberSidebarMobileOpen) =>
        set({ isMemberSidebarMobileOpen }),
    })),

    {
      name: 'ui',
      partialize({ isMemberSidebarOpen }) {
        return { isMemberSidebarOpen };
      },
    }
  )
);

export default useUI;
