import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ControlState {
  isMuted: boolean;
  isDeafen: boolean;
  toggleMute: () => void;
  toggleDefean: () => void;
  setMuted: (isMuted: boolean) => void;
  setDefean: (isDeafen: boolean) => void;
}

const useControl = create(
  persist(
    devtools<ControlState>((set) => ({
      isMuted: false,
      isDeafen: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setMuted: (isMuted) => set({ isMuted }),
      toggleDefean: () => set((state) => ({ isDeafen: !state.isDeafen })),
      setDefean: (isDeafen) => set({ isDeafen }),
    })),
    {
      name: 'control',
      partialize({ isMuted, isDeafen }) {
        return { isMuted, isDeafen };
      },
    }
  )
);

export default useControl;
