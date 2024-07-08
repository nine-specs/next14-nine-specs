import { create } from "zustand";

interface FormState {
  name: string;
  email: string;
  userId: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthdate: string;
  setName: (name: string) => void;
  setUserId: (userId: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setPhone: (phone: string) => void;
  setBirthdate: (birthdate: string) => void;
}

const useFormStore = create<FormState>((set) => ({
  name: "",
  userId: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  birthdate: "",
  setName: (name) => set({ name }),
  setUserId: (userId) => set({ userId }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setPhone: (phone) => set({ phone }),
  setBirthdate: (birthdate) => set({ birthdate }),
}));

export default useFormStore;
