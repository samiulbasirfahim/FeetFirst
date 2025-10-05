import { create } from "zustand";
import { MMKV } from "react-native-mmkv";
import { fetcher } from "@/lib/fetcher";

const storage = new MMKV();
const CART_KEY = "shoe_items";

export type ShoeItem = {
    id: number;
    itemName: string;
    brandName?: string;
    brandLogo?: {
        id: number;
        image: string;
    } | null;
    price: string;
    image?: {
        id: number;
        image: string;
    } | null;
    colors: string[];
    match_percentage: number | null;
    favourite: boolean;
};

type APIShoeResponse = {
    id: number;
    name: string;
    brand: string;
    price: string;
    colors: string[];
    images: Array<{ id: number; image: string }>;
    match_percentage: number | null;
    favourite: boolean;
};

const transformShoe = (apiShoe: APIShoeResponse): ShoeItem => ({
    id: apiShoe.id,
    itemName: apiShoe.name,
    brandName: apiShoe.brand,
    brandLogo: null,
    price: apiShoe.price,
    image: apiShoe.images?.[0] || null,
    colors: apiShoe.colors,
    match_percentage: apiShoe.match_percentage,
    favourite: apiShoe.favourite,
});

type CartState = {
    cartIds: number[];
    items: ShoeItem[];
    loading: boolean;
    addItem: (itemId: number) => void;
    removeItem: (itemId: number) => void;
    clearCart: () => void;
    isInCart: (itemId: number) => boolean;
    fetchAllCartItems: () => Promise<void>;
    fetchAllCartItemsSettled: () => Promise<void>;
    getCartCount: () => number;
};

// Helper to persist
const saveCartToStorage = (cart: number[]) => {
    storage.set(CART_KEY, JSON.stringify(cart));
};

const loadCartFromStorage = (): number[] => {
    try {
        const data = storage.getString(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error loading cart:", e);
        return [];
    }
};

export const useCartStore = create<CartState>((set, get) => ({
    cartIds: loadCartFromStorage(),
    items: [],
    loading: false,

    addItem: (itemId) => {
        const currentCart = get().cartIds;
        if (!currentCart.includes(itemId)) {
            const updated = [...currentCart, itemId];
            saveCartToStorage(updated);
            set({ cartIds: updated });
        }
    },

    removeItem: (itemId) => {
        const updated = get().cartIds.filter((id) => id !== itemId);
        saveCartToStorage(updated);
        set({ cartIds: updated });
    },

    clearCart: () => {
        storage.delete(CART_KEY);
        set({ cartIds: [], items: [] });
    },

    isInCart: (itemId) => {
        return get().cartIds.includes(itemId);
    },

    getCartCount: () => {
        return get().cartIds.length;
    },

    fetchAllCartItems: async () => {
        const { cartIds } = get();
        if (cartIds.length === 0) {
            set({ items: [] });
            return;
        }

        set({ loading: true });
        try {
            const fetchPromises = cartIds.map((id) =>
                fetcher(`/api/products/${id}/`, {
                    method: "GET",
                    auth: true,
                }).catch(() => null),
            );

            const results = await Promise.all(fetchPromises);
            const validItems = results
                .filter((r): r is APIShoeResponse => r !== null)
                .map(transformShoe);

            set({ items: validItems });
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchAllCartItemsSettled: async () => {
        const { cartIds } = get();
        if (cartIds.length === 0) {
            set({ items: [] });
            return;
        }

        set({ loading: true });
        try {
            const results = await Promise.allSettled(
                cartIds.map((id) =>
                    fetcher(`/api/products/${id}/`, {
                        method: "GET",
                        auth: true,
                    }),
                ),
            );

            const validItems = results
                .filter(
                    (r): r is PromiseFulfilledResult<APIShoeResponse> =>
                        r.status === "fulfilled",
                )
                .map((r) => transformShoe(r.value));

            set({ items: validItems });
        } catch (error) {
            console.error("Error fetching settled cart items:", error);
        } finally {
            set({ loading: false });
        }
    },
}));
