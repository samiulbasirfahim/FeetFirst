import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { User } from "@/type/user";
import { create } from "zustand";
import { removeItem } from "./mmkv";
import { fetcher } from "@/lib/fetcher";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

type AuthStore = {
    user: User | null;
    isLoggedIn: boolean;
    onboarding_complete: boolean;
    setUser: (user: User) => void;
    logOut: (refresh: string, queryClient: QueryClient) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isLoggedIn: false,
    onboarding_complete: true,
    setUser(user: User | null) {
        set({ user });
        set({ isLoggedIn: true });
    },
    async logOut(refresh: string, queryClient: QueryClient) {
        console.log("Logging out...");

        queryClient.clear();

        set({ isLoggedIn: false });
        set({ user: null });
        removeItem("access_token");
        removeItem("refresh_token");

        try {
            GoogleSignin.signOut();
        } catch (er) {
            console.log(er);
        }

        console.log("Tokens removed.");

        try {
            await fetcher("/auth/logout", {
                method: "POST",
                body: { refresh_token: refresh },
            });
            console.log("Logged out from server.");
        } catch (error) {
            console.log("Error logging out from server:", error);
        }

        router.dismissAll();
        router.replace("/login");
    },
}));
