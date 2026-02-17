import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export type CartItemResponse = {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string;
    size_id: number;
    size_label: string;
    size_type: string;
    color: string;
    quantity: number;
    price: string;
    total_price: number;
    available: number;
};

export type CartResponse = {
    id: number;
    items: CartItemResponse[];
    total_price: string;
    count: number;
    updated_at: string;
};

export function useGetCart() {
    return useQuery<CartResponse>({
        queryKey: ["cart"],
        queryFn: () =>
            fetcher("/api/cart/", {
                auth: true,
                method: "GET",
            }),
    });
}

export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {
            product: number;
            size_id: number;
            color: string;
            quantity: number;
        }) =>
            fetcher("/api/cart/", {
                auth: true,
                method: "POST",
                body: data,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useRemoveFromCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: number) =>
            fetcher(`/api/cart/${itemId}/`, {
                auth: true,
                method: "DELETE",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}
