import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { ShoeDetails, ShoeItem } from "@/type/product";
import { useMemo } from "react";

export function useTopShoes(limit: number, by_scan?: boolean) {
    const { data, isPending, error } = useQuery({
        queryKey: ["topProducts", limit],
        queryFn: () =>
            fetcher(`/api/products/?scan_id=0&count=${limit}`, {
                method: "GET",
                auth: true,
            }),
    });

    const shoeList: ShoeItem[] = useMemo(() => {
        if (!(data as any)?.results) return [];
        return (data as any).results.map(
            (item: any) =>
                ({
                    id: item.id,
                    itemName: item.name,
                    brandName: "Nike",
                    brandLogo: null,
                    price: `$${item.price}`,
                    image: item.image,
                    favourite: item.favourite,
                }) as ShoeItem,
        );
    }, [data]);

    return { shoeList, isPending, error };
}

export function useTopProducts(limit: number) {
    return useQuery({
        queryKey: ["topProducts", limit],
        queryFn: () =>
            fetcher(`/api/products/?scan_id=0&count=${limit}`, {
                method: "GET",
                auth: true,
            }),
    });
}

export function useGetProduct(id: number) {
    const { data, isPending, error } = useQuery({
        queryKey: ["product", id],
        queryFn: () =>
            fetcher(`/api/products/${id}/?scan_id=0`, {
                method: "GET",
                auth: true,
            }),
    });

    const shoeDetails: ShoeDetails | null = useMemo(() => {
        if (!data) return null;
        return { ...data, brandName: "NIKE", brandLogo: null } as ShoeDetails;
    }, [data]);

    return { shoeDetails, isPending, error };
}

export function useProducts(page: number, sub_category: string | null) {
    const { data, isPending, error } = useQuery({
        queryKey: ["products", page, sub_category],
        queryFn: () =>
            fetcher(
                `/api/products/?scan_id=0&limit=2&page=${page}${sub_category ? "&sub_category=" + sub_category : ""}`,
                {
                    method: "GET",
                    auth: true,
                },
            ),
    });

    const shoeList: ShoeItem[] = useMemo(() => {
        if (!(data as any)?.results) return [];
        return (data as any).results.map(
            (item: any) =>
                ({
                    id: item.id,
                    itemName: item.name,
                    brandName: "Nike",
                    brandLogo: null,
                    price: `$${item.price}`,
                    image: item.image,
                    favourite: item.favourite,
                }) as ShoeItem,
        );
    }, [data]);

    const hasNext = useMemo(() => {
        return Boolean((data as any)?.next);
    }, [data]);

    const hasPrev = useMemo(() => {
        return Boolean((data as any)?.previous);
    }, [data]);

    return { shoeList, isPending, error, hasNext, hasPrev };
}

export function useSuggestedShoes(limit: number, id: number) {
    const { data, isPending, error } = useQuery({
        queryKey: ["topProducts", limit],
        queryFn: () =>
            fetcher(`/api/products/?scan_id=0&count=${limit}`, {
                method: "GET",
                auth: true,
            }),
    });

    const shoeList: ShoeItem[] = useMemo(() => {
        if (!(data as any)?.results) return [];
        return (data as any).results.map(
            (item: any) =>
                ({
                    id: item.id,
                    itemName: item.name,
                    brandName: "Nike",
                    brandLogo: null,
                    price: `$${item.price}`,
                    image: item.image,
                    favourite: item.favourite,
                }) as ShoeItem,
        );
    }, [data]);

    return { shoeList, isPending, error };
}
