import { create } from "zustand";

type State = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  description: string;
  setDescription: (description: string) => void;

  amount: number;
  setAmount: (amount: number) => void;

  confirmText: string;
  setConfirmText: (confirmText: string) => void;

  onConfirm: () => void;
  setOnConfirm: (onConfirm: () => void) => void;
};

export const useConfirmation = create<State>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, description: "", amount: 0 }),

  description: "",
  setDescription: (description: string) => set({ description }),

  amount: 0,
  setAmount: (amount: number) => set({ amount }),

  confirmText: "Ya, lanjutkan",
  setConfirmText: (confirmText: string) => set({ confirmText }),

  onConfirm: () => {},
  setOnConfirm: (onConfirm: () => void) => set({ onConfirm }),
}));
