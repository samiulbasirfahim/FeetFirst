import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { OrderListResponse } from "@/type/order";

export function useOrderList() {
    return useQuery({
        queryKey: ["order-list"],
        queryFn: () =>
            fetcher<OrderListResponse>("/api/users/orders/", {
                method: "GET",
                auth: true,
            }),
    });
}
