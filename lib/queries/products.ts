import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

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

export function useProducts(page: number) {
    return useQuery({
        queryKey: ["products", page],
        queryFn: () => fetcher(`/api/products/?scan_id=0&count=10&page=${page}`),
    });
}
