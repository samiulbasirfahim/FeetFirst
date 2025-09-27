import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export function useFaq() {
    return useQuery({
        queryKey: ["faq"],
        queryFn: () =>
            fetcher("/api/faq/", {
                method: "GET",
                auth: true,
            }),
    });
}
