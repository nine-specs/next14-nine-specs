import { create } from "zustand";

type TUserScialState = {
  id: string;
  name: string;
  email: string;
  birthdate?: string;
  image: string;
  setUser: (user: Partial<TUserScialState>) => void;
};

export const useSocialStore = create<TUserScialState>((set) => ({
  id: "",
  name: "",
  email: "",
  birthdate: "",
  image: "",
  setUser: (user) => set((state) => ({ ...state, ...user })),
}));
