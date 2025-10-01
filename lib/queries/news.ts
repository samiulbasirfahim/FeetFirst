import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export function useGetNews() {
    return useQuery({
        queryKey: ["news"],
        retry: true,
        queryFn: () =>
            fetcher("/api/news", {
                auth: true,
                method: "GET",
            }),
    });
}
