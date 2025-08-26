import { create } from "zustand";


type AuthStore = {
    user: User;
}

export const authStore = create()
