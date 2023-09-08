import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ModalType =
  | 'add-server'
  | 'invite'
  | 'server-settings'
  | 'create-channel'
  | 'create-category'
  | 'user-settings';

interface ModalData {}

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data: ModalData | null;
  show: (type: ModalType, data?: ModalData | null) => void;
  isModalOpen: (type: ModalType) => boolean;
  hide: () => void;
  setOpen: (
    type: ModalType,
    data?: ModalData | null
  ) => (isOpen: boolean) => void;
}

const useModal = create<ModalState>()(
  devtools((set, get) => ({
    isOpen: false,
    type: null,
    data: null,
    isModalOpen: (type) => get().isOpen && type === get().type,
    show: (type, data) => set({ type, data, isOpen: true }),
    hide: () => set({ isOpen: false, type: null, data: null }),
    setOpen:
      (type, data = null) =>
      (isOpen) =>
        set({ isOpen, type, data }),
  }))
);

export default useModal;
