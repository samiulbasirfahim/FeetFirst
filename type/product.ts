export type MatchPercentage = {
    score: number;
    recommended_size: any;
};

export type ShoeItem = {
    id: number;
    itemName: string;
    brandLogo?: {
        name: string;
        image: string;
    } | null;
    price: string;
    image?: {
        id: number;
        image: string;
    } | null;

    colors: string[];

    match_percentage: MatchPercentage | null;
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
    brandLogo?: {
        name: string;
        image: string;
    } | null;
    main_category: string;
    sub_category: string;
    sizes: string[];
    toe_box: string;
    price: string;
    discount: string;
    stock_quantity: number;
    partner: number;
    match_percentage: MatchPercentage | null;
    favourite: boolean;
};
