import { useMutation, useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import type { CreateAddress } from "@/type/user";

export function useCreateAddress() {
    return useMutation({
        mutationFn: (data: CreateAddress) =>
            fetcher("/api/users/addresses/", {
                method: "POST",
                body: data,
                auth: true,
            }),
    });
}

export function useUpdateAddress() {
    return useMutation({
        mutationFn: (data: CreateAddress) =>
            fetcher("/api/users/addresses/me/", {
                method: "PATCH",
                body: data,
                auth: true,
            }),
    });
}

export function useGetAddress() {
    return useQuery({
        initialData: [],
        queryKey: ["user-address"],
        queryFn: () =>
            fetcher("/api/users/addresses/me/", {
                method: "GET",
                auth: true,
            }),
    });
}
