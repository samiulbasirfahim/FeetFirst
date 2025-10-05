import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { News } from "../../type/news";

export function useGetNews() {
    return useQuery<News[]>({
        queryKey: ["news"],
        retry: true,
        queryFn: async (): Promise<News[]> => {
            try {
                const data = await fetcher<News[]>("/api/news", {
                    auth: true,
                    method: "GET",
                });
                return data;
            } catch (error) {
                return [];
            }
        },
    });
}
