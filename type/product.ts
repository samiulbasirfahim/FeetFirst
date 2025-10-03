export type ShoeItem = {
    id: number;
    itemName: string;
    brandName?: string;
    brandLogo?: {
        id: number;
        image: string;
    } | null;
    price: string;
    image?: {
        id: number;
        image: string;
    } | null;

    match_percentage: number | null;
    favourite: boolean;
};

export type ShoeDetails = {
    id: number;
    name: string;
    colors: string[];
    images: {
        id: number;
        image: string;
    }[];
    technical_data: Record<string, unknown>;
    brandName: string;
    brandLogo: {
        id: number;
        image: string;
    } | null;
    main_category: string;
    sub_category: string;
    sizes: string[];
    toe_box: string;
    further_information: string;
    price: string;
    discount: string;
    stock_quantity: number;
    partner: number;
    match_percentage: number | null;
};
