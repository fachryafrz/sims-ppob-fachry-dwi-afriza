import { create } from "zustand";

type State = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  description: string;
  setDescription: (description: string) => void;

  amount: number;
  setAmount: (amount: number) => void;

  status: string;
  setStatus: (status: string) => void;
};

export const useStatus = create<State>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, description: "", amount: 0 }),

  description: "",
  setDescription: (description: string) => set({ description }),

  amount: 0,
  setAmount: (amount: number) => set({ amount }),

  status: "",
  setStatus: (status: string) => set({ status }),
}));
