import { User } from "@/type/user";
import { create } from "zustand";
import { removeItem } from "./mmkv";
import { fetcher } from "@/lib/fetcher";

type AuthStore = {
  user: User | null;
  isLoggedIn: boolean;
  onboarding_complete: boolean;
  setUser: (user: User) => void;
  logOut: (refresh: string, callback: (status: boolean) => void) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  onboarding_complete: true,
  setUser(user: User | null) {
    set({ user });
    set({ isLoggedIn: true });
  },
  logOut(refresh: string, callback: (status: boolean) => void) {
    set({ isLoggedIn: false });
    set({ user: null });
    removeItem("access_token");
    removeItem("refresh_token");
    fetcher("/api/users/logout/", {
      method: "POST",
      body: {
        refresh: refresh,
      },
    });
    callback(true);
  },
}));
