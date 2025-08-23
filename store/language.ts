import { create } from "zustand";

type LanguageStore = {
  language: "german" | "italian";
  isGerman: () => boolean;
  toggle: () => void;
  setLanguage: (language: string) => void;
};

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: "german",
  toggle() {
    set((state) => ({
      language: state.language === "german" ? "italian" : "german",
    }));
  },
  setLanguage(language) {
    set({ language: language as "german" | "italian" });
  },
  isGerman() {
    return get().language === "german";
  },
}));
