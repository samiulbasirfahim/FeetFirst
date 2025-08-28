import { User } from "@/type/user";
import { create } from "zustand";

type AuthStore = {
    user: User | null;
    onboarding_complete: boolean;
    setUser: (user: User) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    onboarding_complete: true,
    setUser(user: User | null) {
        set({ user });
    },
}));
