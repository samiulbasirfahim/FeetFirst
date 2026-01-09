import { useMutation, useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import type { CreateAddress } from "@/type/user";
import { queryClient } from "../queryClient";

export function useCreateAddress() {
    return useMutation({
        mutationFn: (data: CreateAddress) =>
            fetcher("/api/users/addresses/", {
                method: "POST",
                body: data,
                auth: true,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-address"] });
        },
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-address"] });
        },
    });
}

export function useGetAddress() {
    return useQuery({
        initialData: {},
        queryKey: ["user-address"],
        queryFn: () =>
            fetcher("/api/users/addresses/me/", {
                method: "GET",
                auth: true,
            }),
    });
}
