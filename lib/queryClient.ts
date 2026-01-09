import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 5 * 60 * 1000, // 10 minutes
            retry: 2, // Retry failed requests twice
            refetchOnWindowFocus: true, // Do not refetch on window focus
        },
    },
});
