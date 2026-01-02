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

    images: {
        id: number;
        image: string;
        color_hex: string;
    }[];

    technical_data: string;
    description: string;
    further_information: string;

    brand: {
        name: string;
        image: string;
    } | null;

    sub_category: string;

    features: {
        image: string;
        title: string;
        details: string;
    }[];

    price: string;
    discount: string | null;

    match_data: Record<string, string>;
    favourite: boolean;

    gender: "male" | "female" | "unisex";

    sizes: {
        size_id: number;
        size: string;
        quantity: number;
    }[];

    quantity: number;

    qna: unknown[];
};
 
