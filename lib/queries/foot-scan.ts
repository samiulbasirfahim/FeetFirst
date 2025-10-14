import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

type FootScan = {
    left_length: string;
    right_length: string;
    left_width: string;
    right_width: string;
};

export function useFeetScan() {
    const { data, isPending, error } = useQuery({
        queryKey: ["footScan"],
        queryFn: () =>
            fetcher(`/api/products/footscans/`, {
                method: "GET",
                auth: true,
            }),
    });
    const mappedData: FootScan =
        data && (data as []).length > 0
            ? {
                left_length: data[0].left_length,
                right_length: data[0].right_length,
                left_width: data[0].left_width,
                right_width: data[0].right_width,
            }
            : {
                left_length: "0",
                right_length: "0",
                left_width: "0",
                right_width: "0",
            };

    return { footScan: mappedData, isPending, error };
}
