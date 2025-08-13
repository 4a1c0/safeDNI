import { create } from 'zustand';

interface AppState {
  frontImage?: string;
  backImage?: string;
  setFront: (img: string | undefined) => void;
  setBack: (img: string | undefined) => void;
}

export const useAppStore = create<AppState>((set) => ({
  frontImage: undefined,
  backImage: undefined,
  setFront: (frontImage) => set({ frontImage }),
  setBack: (backImage) => set({ backImage }),
}));
