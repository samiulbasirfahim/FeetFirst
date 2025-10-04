import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { useMemo, useState } from "react";
import { type ShoeItem } from "@/type/product";

export function useAddFavourite() {
    const [id, setCurrent_id] = useState<null | number>(null);
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
            queryClient.invalidateQueries({ queryKey: ["product"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setCurrent_id(null);
        },

        mutationFn: (product_id: number) => {
            setCurrent_id(id);
            return fetcher("/api/products/favorites/", {
                auth: true,
                method: "PATCH",
                body: {
                    product_id,
                    action: "add",
                },
            });
        },
    });
}

export function useRemoveFavourite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product_id: number) =>
            fetcher("/api/products/favorites/", {
                auth: true,
                method: "PATCH",
                body: {
                    product_id,
                    action: "remove",
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
        },
    });
}

export function useGetFavourites() {
    const { data, isPending, error } = useQuery({
        queryKey: ["favourites"],
        queryFn: () =>
            fetcher("/api/products/favorites/", {
                auth: true,
                method: "GET",
            }),
    });

    const favouriteList: ShoeItem[] = useMemo(() => {
        if (!(data as any)?.products) return [];
        return (data as any).products.map(
            (item: any) =>
                ({
                    id: item.id,
                    itemName: item.name,
                    brandName: "Nike",
                    brandLogo: null,
                    price: `$${item.price}`,
                    image: item.image,
                    match_percentage: null,
                    favourite: true,
                }) as ShoeItem,
        );
    }, [data]);

    return { favouriteList, isPending, error };
}
