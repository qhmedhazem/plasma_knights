import { create } from "zustand";

interface PopupStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));
