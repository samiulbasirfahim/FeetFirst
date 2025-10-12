import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { Partner } from "@/type/partner";

export function useGetPartners() {
    const { isPending, data, error } = useQuery({
        queryKey: ["partners"],
        queryFn: () =>
            fetcher("/api/users/paertners/", {
                method: "GET",
                auth: true,
            }),
    });

    // const partners = [
    //     {
    //         id: 1,
    //         title: "Partner One",
    //         lat: 40.7128,
    //         lng: -74.006,
    //         address: "New York, USA",
    //     },
    //     {
    //         id: 2,
    //         title: "Partner Two",
    //         lat: 51.5074,
    //         lng: -0.1278,
    //         address: "London, UK",
    //     },
    //     {
    //         id: 3,
    //         title: "Partner Three",
    //         lat: 35.6895,
    //         lng: 139.6917,
    //         address: "Tokyo, Japan",
    //     },
    //     {
    //         id: 4,
    //         title: "Partner Four",
    //         lat: -33.8688,
    //         lng: 151.2093,
    //         address: "Sydney, Australia",
    //     },
    //     {
    //         id: 5,
    //         title: "Partner Five",
    //         lat: 48.8566,
    //         lng: 2.3522,
    //         address: "Paris, France",
    //     },
    //     {
    //         id: 6,
    //         title: "Partner Six",
    //         lat: 55.7558,
    //         lng: 37.6173,
    //         address: "Moscow, Russia",
    //     },
    //     {
    //         id: 7,
    //         title: "Partner Seven",
    //         lat: -23.5505,
    //         lng: -46.6333,
    //         address: "São Paulo, Brazil",
    //     },
    //     {
    //         id: 8,
    //         title: "Partner Eight",
    //         lat: 19.4326,
    //         lng: -99.1332,
    //         address: "Mexico City, Mexico",
    //     },
    //     {
    //         id: 9,
    //         title: "Partner Nine",
    //         lat: 52.3676,
    //         lng: 4.9041,
    //         address: "Amsterdam, Netherlands",
    //     },
    //     {
    //         id: 10,
    //         title: "Partner Ten",
    //         lat: 1.3521,
    //         lng: 103.8198,
    //         address: "Singapore",
    //     },
    // ];
    //
    const partners: Partner[] = ((data as []) || [])
        .filter((p: any) => p.lat !== null && p.lng !== null)
        .map((p: any, index: number) => ({
            id: index + 1,
            title: p.name || "Unnamed",
            lat: p.lat,
            lng: p.lng,
            address: p.address || undefined,
        }));

    return { isPending, partners, error };
}
