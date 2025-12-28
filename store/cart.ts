import { create } from "zustand";
import { MMKV } from "react-native-mmkv";
import { fetcher } from "@/lib/fetcher";
import { MatchData } from "@/type/product";

const storage = new MMKV();
const CART_KEY = "shoe_items";

export type CartItem = {
    productId: number;
    sizeId: number | null;
    size: string | null;
    color: string | null;
    quantity: number;
};

export type ShoeItem = {
    id: number;
    itemName: string;
    brandName?: string;
    brand?: {
        id: number;
        image: string;
    } | null;
    price: string;
    image?: {
        id: number;
        image: string;
    } | null;
    colors: string[];
    match_data: MatchData | null;
    favourite: boolean;
};

type APIShoeResponse = {
    id: number;
    name: string;
    brand: string;
    price: string;
    colors: string[];
    images: { id: number; image: string }[];
    match_data: MatchData | null;
    favourite: boolean;
};

const transformShoe = (apiShoe: APIShoeResponse): ShoeItem => ({
    id: apiShoe.id,
    itemName: apiShoe.name,
    brandName: apiShoe.brand,
    brand: null,
    price: apiShoe.price,
    image: apiShoe.images?.[0] || null,
    colors: apiShoe.colors,
    match_data: apiShoe.match_data,
    favourite: apiShoe.favourite,
});

const saveCartToStorage = (cart: CartItem[]) => {
    storage.set(CART_KEY, JSON.stringify(cart));
};

const loadCartFromStorage = (): CartItem[] => {
    try {
        const data = storage.getString(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error loading cart:", e);
        return [];
    }
};

type CartState = {
    cartItems: CartItem[];
    items: ShoeItem[];
    loading: boolean;

    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    updateQuantity: (item: CartItem, quantity: number) => void;

    clearCart: () => void;
    isInCart: (item: number) => boolean;
    getCartCount: () => number;

    fetchAllCartItems: () => Promise<void>;
    fetchAllCartItemsSettled: () => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
    cartItems: loadCartFromStorage(),
    items: [],
    loading: false,

    addItem: (item) => {
        const current = get().cartItems;

        const existingIndex = current.findIndex(
            (i) =>
                i.productId === item.productId &&
                i.sizeId === item.sizeId &&
                i.color === item.color,
        );

        let updated: CartItem[];

        if (existingIndex !== -1) {
            updated = [...current];
            updated[existingIndex] = {
                ...updated[existingIndex],
                quantity: updated[existingIndex].quantity + item.quantity,
            };
        } else {
            updated = [...current, item];
        }

        saveCartToStorage(updated);
        set({ cartItems: updated });
    },
    removeItem: (item) => {
        const updated = get().cartItems.filter(
            (i) =>
                !(
                    i.productId === item.productId &&
                    i.sizeId === item.sizeId &&
                    i.color === item.color
                ),
        );

        saveCartToStorage(updated);
        set({ cartItems: updated });
    },

    updateQuantity: (item, quantity) => {
        const updated = get().cartItems.map((i) =>
            i.productId === item.productId &&
                i.sizeId === item.sizeId &&
                i.color === item.color
                ? { ...i, quantity }
                : i,
        );

        saveCartToStorage(updated);
        set({ cartItems: updated });
    },

    /* -----------------------------
                               CLEAR
                            -------------------------------- */
    clearCart: () => {
        storage.delete(CART_KEY);
        set({ cartItems: [], items: [] });
    },

    /* -----------------------------
                               CHECK
                            -------------------------------- */
    isInCart: (item: number) => {
        return get().cartItems.some((i) => i.productId === item);
    },

    getCartCount: () => {
        return get().cartItems.reduce((sum, i) => {
            const qty =
                typeof i.quantity === "number" && !Number.isNaN(i.quantity)
                    ? i.quantity
                    : 0;

            return sum + qty;
        }, 0);
    },

    fetchAllCartItems: async () => {
        const { cartItems } = get();
        if (cartItems.length === 0) {
            set({ items: [] });
            return;
        }

        set({ loading: true });
        try {
            const uniqueProductIds = [...new Set(cartItems.map((i) => i.productId))];

            const results = await Promise.all(
                uniqueProductIds.map((id) =>
                    fetcher(`/api/products/${id}/`, {
                        method: "GET",
                        auth: true,
                    }).catch(() => null),
                ),
            );

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
        const { cartItems } = get();
        if (cartItems.length === 0) {
            set({ items: [] });
            return;
        }

        set({ loading: true });
        try {
            const uniqueProductIds = [...new Set(cartItems.map((i) => i.productId))];

            const results = await Promise.allSettled(
                uniqueProductIds.map((id) =>
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
