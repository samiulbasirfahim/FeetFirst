export type MatchData = {
    score: number;
    recommended_size: any;
};

export type ShoeItem = {
    id: number;
    sub_category: string;
    itemName: string;
    brand?: {
        name: string;
        image: string;
    } | null;
    price: string;
    image?: {
        id: number;
        image: string;
    } | null;

    colors: string[];
    match_data: MatchData | null;
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
    further_information: string;
    technical_data: string;
    description: string;
    brand?: {
        name: string;
        image: string;
    } | null;
    main_category: string;
    sub_category: string;
    sizes: {
        size: string[];
        size_id: number;
        quantity: number;
    }[];
    toe_box: string;
    price: string;
    discount: string;
    stock_quantity: number;
    partner: number;
    match_data: Record<string, string> | null;
    favourite: boolean;
    features: {
        image: string;
        title: string;
        details: string;
    }[];
};
