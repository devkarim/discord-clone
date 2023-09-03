import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ServerModalState {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
  setOpen: (isOpen: boolean) => void;
}

const useServerModal = create<ServerModalState>()(
  devtools((set) => ({
    isOpen: false,
    show: () => set({ isOpen: true }),
    hide: () => set({ isOpen: false }),
    setOpen: (isOpen) => set({ isOpen }),
  }))
);

export default useServerModal;
