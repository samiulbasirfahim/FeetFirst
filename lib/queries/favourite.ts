import { useMutation, useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { useMemo } from "react";
import { type ShoeItem } from "@/type/product";

export function useAddFavourite() {
    return useMutation({
        mutationFn: (product_id: number) =>
            fetcher("/api/products/favorites/", {
                auth: true,
                method: "PATCH",
                body: {
                    product_id,
                    action: "add",
                },
            }),
    });
}

export function useRemoveFavourite() {
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
        return (data as any).products.map((item: any) => ({
            id: item.id,
            itemName: item.name,
            brandName: "Nike",
            brandLogo: null,
            price: `$${item.price}`,
            image: item.image,
            match_percentage: null,
        }));
    }, [data]);

    return { favouriteList, isPending, error };
}
