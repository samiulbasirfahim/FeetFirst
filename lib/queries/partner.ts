import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export function useGetPartners() {
    return useQuery({
        queryKey: ["partners"],
        queryFn: () =>
            fetcher("/api/partners/", {
                method: "GET",
                auth: false,
            }),
    });
}
