import { create } from "zustand";

type ParamStore = {
  params: Record<string, string | null>;
  setParam: (key: string, value: string | null) => void;
  getParam: (key: string) => string | null;
  clearParams: () => void;
};

export const useParamStore = create<ParamStore>((set, get) => ({
  params: {},

  setParam: (key, value) =>
    set((state) => ({
      params: { ...state.params, [key]: value },
    })),

  getParam: (key) => get().params[key] ?? null,

  clearParams: () => set({ params: {} }),
}));
