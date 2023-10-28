import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ConversationMediaState {
  isVoice: boolean;
  isVideo: boolean;
  conversationId: number | null;
  toggleVoice: () => void;
  toggleVideo: () => void;
  setVoice: (isMuted: boolean) => void;
  setVideo: (isDeafen: boolean) => void;
  setConversationId: (conversationId: number | null) => void;
}

const useConversationMedia = create(
  persist(
    devtools<ConversationMediaState>((set) => ({
      isVoice: false,
      isVideo: false,
      conversationId: null,
      toggleVoice: () => set((state) => ({ isVoice: !state.isVoice })),
      toggleVideo: () => set((state) => ({ isVideo: !state.isVideo })),
      setVoice: (isMuted) => set(() => ({ isVoice: isMuted })),
      setVideo: (isDeafen) => set(() => ({ isVideo: isDeafen })),
      setConversationId: (conversationId) => set(() => ({ conversationId })),
    })),
    {
      name: 'conversation-media',
      partialize({ isVoice, isVideo, conversationId }) {
        return { isVoice, isVideo, conversationId };
      },
    }
  )
);

export default useConversationMedia;
