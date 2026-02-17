import { create } from "zustand";
import { CartResponse } from "@/lib/queries/cart";

type CartState = {
    cart: CartResponse | null;
    setCart: (cart: CartResponse | null) => void;
    getCartCount: () => number;
    isInCart: (productId: number, sizeId: number) => boolean;
    getCartItem: (productId: number, sizeId: number) => CartResponse['items'][0] | null;
};

export const useCartStore = create<CartState>((set, get) => ({
    cart: null,

    setCart: (cart) => {
        set({ cart });
    },

    getCartCount: () => {
        return get().cart?.count ?? 0;
    },

    isInCart: (productId: number, sizeId: number) => {
        const cart = get().cart;
        if (!cart?.items) return false;
        
        return cart.items.some(
            (item) => item.product_id === productId && item.size_id === sizeId
        );
    },

    getCartItem: (productId: number, sizeId: number) => {
        const cart = get().cart;
        if (!cart?.items) return null;
        
        return cart.items.find(
            (item) => item.product_id === productId && item.size_id === sizeId
        ) ?? null;
    },
}));
