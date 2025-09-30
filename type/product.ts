export type ShoeItem = {
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
};
