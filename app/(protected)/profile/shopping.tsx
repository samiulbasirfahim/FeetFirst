import ShoeHeader from "@/components/common/category-header";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { FlatList, Image, View } from "react-native";
import { ShoppingDropDown } from "@/components/common/shopping-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ItemImagePlaceholder } from "@/lib/placeholder";

const categories = [
    {
        slug: "all",
        de: "Alle Kategorien",
        it: "Tutte le categorie",
    },
    {
        slug: "casual-sneaker",
        de: "Freizeitschuhe und sneakers",
        it: "Scarpe casual e sneaker",
    },
    {
        slug: "elegant-shoes",
        de: "Elegante schuhe",
        it: "Scarpe eleganti",
    },
    {
        slug: "comfortable-shoes",
        de: "Bequeme schuhe",
        it: "Scarpe comode",
    },
    {
        slug: "sandals",
        de: "Sandalen",
        it: "Sandali",
    },
    {
        slug: "work-shoes",
        de: "Arbeitsschuhe",
        it: "Scarpe da lavoro",
    },
    {
        slug: "miscellaneous",
        de: "Verschiedenes",
        it: "Varie",
    },
    {
        slug: "running-shoes",
        de: "Laufschuhe",
        it: "Scarpe da running",
    },
    {
        slug: "cycling-shoes",
        de: "Radschuhe",
        it: "Scarpe da ciclismo",
    },
    {
        slug: "hockey-shoes",
        de: "Hockeyschuhe",
        it: "Scarpe da hockey",
    },
    {
        slug: "ski-boots",
        de: "Skischuhe",
        it: "Scarponi da ski",
    },
    {
        slug: "basketball-shoes",
        de: "Basketballschuhe",
        it: "Scarpe da basket",
    },
    {
        slug: "golf-shoes",
        de: "Golfschuhe",
        it: "Scarpe da golf",
    },
    {
        slug: "football-shoes",
        de: "Fussballschuhe",
        it: "Scarpe da calcio",
    },
    {
        slug: "tennis-shoes",
        de: "Tennisschuhe",
        it: "Scarpe da tennis",
    },
    {
        slug: "climbing-shoes",
        de: "Kletterschuhe",
        it: "Scarpe da arrampicata",
    },
    {
        slug: "mountain-trekking-shoes",
        de: "Berg Trekkingschuhe",
        it: "Montagna & Trekking",
    },
];

// =======================================================
// TYPES
// =======================================================

export type MatchData = number;

export type DeliveryInfo = {
    date: string; // "10.04.2025"
    year: number; // 2025
    delivered: boolean;
};

export type ShoeItem = {
    id: number;
    sub_category: string; // slug
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

    size: {
        value: string;
        quantity: number;
    };

    colors: string[];
    match_data: MatchData | null;
    favourite: boolean;

    delivery: DeliveryInfo;
};

// =======================================================
// 40 DUMMY SHOES
// =======================================================

const PLACEHOLDER =
    "https://scontent.fdac34-2.fna.fbcdn.net/v/t39.30808-1/476309008_9148170328627702_2184255534344464069_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeERsC35nDOl2qEmJgoLvj-c7lWXEmKUT8XuVZcSYpRPxaw1pmof1WTvPZs2m9HvYsBKQmg3P9PRVUnvAz3Gv0B-&_nc_ohc=rn_UqeuFirkQ7kNvwG3yCk5&_nc_oc=Admk-bF7lrVevZHh6KHVEOjMh3CdI_aucTQ33VegM5Q-Aj51xxRhFUiEUvrF6hbrUKyUIzSBiFwTtx9BJ0TthdK2&_nc_zt=24&_nc_ht=scontent.fdac34-2.fna&_nc_gid=FdyxlKFD4E_bcBeUBqcivQ&oh=00_Afmm9cPr6S8_VWV5Aq8xM_jbc02LwaCwDGdiGcyiwETCVA&oe=693BCE01";

export const orders: ShoeItem[] = [
    // ---------------- Running Shoes ----------------
    {
        id: 1,
        sub_category: "running-shoes",
        itemName: "Saucony Ride 15 TR Blue",
        brand: { name: "Saucony", image: PLACEHOLDER },
        price: "149.99",
        image: { id: 1, image: PLACEHOLDER },
        size: { value: "42.5", quantity: 1 },
        colors: ["#3366FF"],
        match_data: 90,
        favourite: false,
        delivery: { date: "10.04.2025", year: 2025, delivered: true },
    },
    {
        id: 2,
        sub_category: "running-shoes",
        itemName: "Nike Pegasus 40",
        brand: { name: "Nike", image: PLACEHOLDER },
        price: "129.00",
        image: { id: 2, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#000000"],
        match_data: 85,
        favourite: true,
        delivery: { date: "12.03.2025", year: 2025, delivered: true },
    },
    {
        id: 3,
        sub_category: "running-shoes",
        itemName: "Adidas Ultraboost 22",
        brand: { name: "Adidas", image: PLACEHOLDER },
        price: "159.99",
        image: { id: 3, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#FFFFFF"],
        match_data: 91,
        favourite: false,
        delivery: { date: "20.12.2024", year: 2024, delivered: true },
    },
    {
        id: 4,
        sub_category: "running-shoes",
        itemName: "Hoka Clifton 9",
        brand: { name: "Hoka", image: PLACEHOLDER },
        price: "139.99",
        image: { id: 4, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#22AAFF"],
        match_data: 94,
        favourite: false,
        delivery: { date: "03.09.2023", year: 2023, delivered: true },
    },

    // ---------------- Casual Sneakers ----------------
    {
        id: 5,
        sub_category: "casual-sneaker",
        itemName: "Nike Air Force 1",
        brand: { name: "Nike", image: PLACEHOLDER },
        price: "119.99",
        image: { id: 5, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#FFFFFF"],
        match_data: 89,
        favourite: true,
        delivery: { date: "02.01.2025", year: 2025, delivered: true },
    },
    {
        id: 6,
        sub_category: "casual-sneaker",
        itemName: "Adidas Campus 00s",
        brand: { name: "Adidas", image: PLACEHOLDER },
        price: "99.00",
        image: { id: 6, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#22FFAA"],
        match_data: 82,
        favourite: false,
        delivery: { date: "18.10.2024", year: 2024, delivered: true },
    },
    {
        id: 7,
        sub_category: "casual-sneaker",
        itemName: "Puma Slipstream",
        brand: { name: "Puma", image: PLACEHOLDER },
        price: "109.00",
        image: { id: 7, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#000000"],
        match_data: 80,
        favourite: false,
        delivery: { date: "14.03.2023", year: 2023, delivered: true },
    },
    {
        id: 8,
        sub_category: "casual-sneaker",
        itemName: "New Balance 550",
        brand: { name: "New Balance", image: PLACEHOLDER },
        price: "119.00",
        image: { id: 8, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#FFFFFF"],
        match_data: 86,
        favourite: true,
        delivery: { date: "02.06.2024", year: 2024, delivered: true },
    },

    // ---------------- Elegant Shoes ----------------
    {
        id: 9,
        sub_category: "elegant-shoes",
        itemName: "Clarks Tilden Cap",
        brand: { name: "Clarks", image: PLACEHOLDER },
        price: "129.99",
        image: { id: 9, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#444444"],
        match_data: 75,
        favourite: false,
        delivery: { date: "10.12.2024", year: 2024, delivered: true },
    },
    {
        id: 10,
        sub_category: "elegant-shoes",
        itemName: "Geox Federico",
        brand: { name: "Geox", image: PLACEHOLDER },
        price: "119.00",
        image: { id: 10, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#222222"],
        match_data: 77,
        favourite: false,
        delivery: { date: "28.07.2023", year: 2023, delivered: true },
    },

    // ---------------- Comfortable Shoes ----------------
    {
        id: 11,
        sub_category: "comfortable-shoes",
        itemName: "Skechers GoWalk Comfort",
        brand: { name: "Skechers", image: PLACEHOLDER },
        price: "89.99",
        image: { id: 11, image: PLACEHOLDER },
        size: { value: "42.5", quantity: 1 },
        colors: ["#AAAAAA"],
        match_data: 93,
        favourite: true,
        delivery: { date: "10.06.2025", year: 2025, delivered: true },
    },
    {
        id: 12,
        sub_category: "comfortable-shoes",
        itemName: "Hoka Bondi 8",
        brand: { name: "Hoka", image: PLACEHOLDER },
        price: "159.00",
        image: { id: 12, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#BBBBBB"],
        match_data: 95,
        favourite: false,
        delivery: { date: "09.05.2024", year: 2024, delivered: true },
    },

    // ---------------- Sandals ----------------
    {
        id: 13,
        sub_category: "sandals",
        itemName: "Birkenstock Arizona",
        brand: { name: "Birkenstock", image: PLACEHOLDER },
        price: "99.99",
        image: { id: 13, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#A67B5B"],
        match_data: 88,
        favourite: true,
        delivery: { date: "20.07.2023", year: 2023, delivered: true },
    },
    {
        id: 14,
        sub_category: "sandals",
        itemName: "Teva Terra Fi 5",
        brand: { name: "Teva", image: PLACEHOLDER },
        price: "89.00",
        image: { id: 14, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#333333"],
        match_data: 82,
        favourite: false,
        delivery: { date: "11.08.2024", year: 2024, delivered: true },
    },

    // ---------------- Work Shoes ----------------
    {
        id: 15,
        sub_category: "work-shoes",
        itemName: "Cofra Safety Pro",
        brand: { name: "Cofra", image: PLACEHOLDER },
        price: "79.00",
        image: { id: 15, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#444444"],
        match_data: 70,
        favourite: false,
        delivery: { date: "03.04.2025", year: 2025, delivered: true },
    },
    {
        id: 16,
        sub_category: "work-shoes",
        itemName: "Reebok Work Cushion",
        brand: { name: "Reebok", image: PLACEHOLDER },
        price: "69.00",
        image: { id: 16, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#000000"],
        match_data: 73,
        favourite: false,
        delivery: { date: "15.10.2024", year: 2024, delivered: true },
    },

    // ---------------- Cycling Shoes ----------------
    {
        id: 17,
        sub_category: "cycling-shoes",
        itemName: "Shimano RC1",
        brand: { name: "Shimano", image: PLACEHOLDER },
        price: "129.00",
        image: { id: 17, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#0000FF"],
        match_data: 85,
        favourite: false,
        delivery: { date: "09.02.2025", year: 2025, delivered: true },
    },
    {
        id: 18,
        sub_category: "cycling-shoes",
        itemName: "Giro Cadet",
        brand: { name: "Giro", image: PLACEHOLDER },
        price: "119.00",
        image: { id: 18, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#FFFFFF"],
        match_data: 82,
        favourite: true,
        delivery: { date: "10.11.2024", year: 2024, delivered: true },
    },

    // ---------------- Hockey Shoes ----------------
    {
        id: 19,
        sub_category: "hockey-shoes",
        itemName: "Asics Gel-Hockey Typhoon",
        brand: { name: "Asics", image: PLACEHOLDER },
        price: "139.00",
        image: { id: 19, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#FF8800"],
        match_data: 84,
        favourite: false,
        delivery: { date: "05.02.2025", year: 2025, delivered: true },
    },
    {
        id: 20,
        sub_category: "hockey-shoes",
        itemName: "Adidas Hockey Lux",
        brand: { name: "Adidas", image: PLACEHOLDER },
        price: "149.00",
        image: { id: 20, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#000000"],
        match_data: 87,
        favourite: true,
        delivery: { date: "19.10.2024", year: 2024, delivered: true },
    },

    // ---------------- Ski Boots ----------------
    {
        id: 21,
        sub_category: "ski-boots",
        itemName: "Salomon S/Pro 100",
        brand: { name: "Salomon", image: PLACEHOLDER },
        price: "399.00",
        image: { id: 21, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#1F75FE"],
        match_data: 93,
        favourite: false,
        delivery: { date: "10.12.2025", year: 2025, delivered: true },
    },
    {
        id: 22,
        sub_category: "ski-boots",
        itemName: "Nordica SpeedMachine",
        brand: { name: "Nordica", image: PLACEHOLDER },
        price: "369.00",
        image: { id: 22, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#990000"],
        match_data: 90,
        favourite: true,
        delivery: { date: "03.01.2024", year: 2024, delivered: true },
    },

    // ---------------- Tennis Shoes ----------------
    {
        id: 23,
        sub_category: "tennis-shoes",
        itemName: "Asics Court FF 3",
        brand: { name: "Asics", image: PLACEHOLDER },
        price: "169.00",
        image: { id: 23, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#0044FF"],
        match_data: 92,
        favourite: true,
        delivery: { date: "09.08.2025", year: 2025, delivered: true },
    },
    {
        id: 24,
        sub_category: "tennis-shoes",
        itemName: "Nike Vapor Pro",
        brand: { name: "Nike", image: PLACEHOLDER },
        price: "139.00",
        image: { id: 24, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#00CC88"],
        match_data: 88,
        favourite: false,
        delivery: { date: "16.06.2024", year: 2024, delivered: true },
    },

    // ---------------- Football Shoes ----------------
    {
        id: 25,
        sub_category: "football-shoes",
        itemName: "Nike Mercurial Vapor 15",
        brand: { name: "Nike", image: PLACEHOLDER },
        price: "199.00",
        image: { id: 25, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#FF5500"],
        match_data: 95,
        favourite: true,
        delivery: { date: "01.01.2024", year: 2024, delivered: true },
    },
    {
        id: 26,
        sub_category: "football-shoes",
        itemName: "Adidas Predator Accuracy",
        brand: { name: "Adidas", image: PLACEHOLDER },
        price: "189.00",
        image: { id: 26, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#000000"],
        match_data: 93,
        favourite: false,
        delivery: { date: "22.02.2023", year: 2023, delivered: true },
    },

    // ---------------- Golf Shoes ----------------
    {
        id: 27,
        sub_category: "golf-shoes",
        itemName: "FootJoy Pro SL",
        brand: { name: "FootJoy", image: PLACEHOLDER },
        price: "169.00",
        image: { id: 27, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#FFFFFF"],
        match_data: 90,
        favourite: false,
        delivery: { date: "03.04.2023", year: 2023, delivered: true },
    },
    {
        id: 28,
        sub_category: "golf-shoes",
        itemName: "Nike Air Max Golf",
        brand: { name: "Nike", image: PLACEHOLDER },
        price: "149.00",
        image: { id: 28, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#000000"],
        match_data: 87,
        favourite: false,
        delivery: { date: "11.03.2024", year: 2024, delivered: true },
    },

    // ---------------- Miscellaneous ----------------
    {
        id: 29,
        sub_category: "miscellaneous",
        itemName: "Crocs Classic Clog",
        brand: { name: "Crocs", image: PLACEHOLDER },
        price: "49.99",
        image: { id: 29, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#00FFDD"],
        match_data: 70,
        favourite: true,
        delivery: { date: "01.05.2025", year: 2025, delivered: true },
    },
    {
        id: 30,
        sub_category: "miscellaneous",
        itemName: "UGG Tasman Slippers",
        brand: { name: "UGG", image: PLACEHOLDER },
        price: "129.00",
        image: { id: 30, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#A65E2E"],
        match_data: 82,
        favourite: false,
        delivery: { date: "01.10.2024", year: 2024, delivered: true },
    },

    // ---------------- Mountain & Trekking ----------------
    {
        id: 31,
        sub_category: "mountain-trekking-shoes",
        itemName: "Salewa Mountain Trainer",
        brand: { name: "Salewa", image: PLACEHOLDER },
        price: "179.00",
        image: { id: 31, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#556B2F"],
        match_data: 94,
        favourite: true,
        delivery: { date: "03.03.2025", year: 2025, delivered: true },
    },
    {
        id: 32,
        sub_category: "mountain-trekking-shoes",
        itemName: "La Sportiva TX4",
        brand: { name: "La Sportiva", image: PLACEHOLDER },
        price: "159.00",
        image: { id: 32, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#8B4513"],
        match_data: 90,
        favourite: false,
        delivery: { date: "14.06.2024", year: 2024, delivered: true },
    },

    // ---------------- Fillers to reach 40 ----------------
    {
        id: 33,
        sub_category: "running-shoes",
        itemName: "Brooks Ghost 15",
        brand: { name: "Brooks", image: PLACEHOLDER },
        price: "139.00",
        image: { id: 33, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#1100FF"],
        match_data: 88,
        favourite: false,
        delivery: { date: "12.12.2025", year: 2025, delivered: true },
    },
    {
        id: 34,
        sub_category: "casual-sneaker",
        itemName: "Vans Old Skool",
        brand: { name: "Vans", image: PLACEHOLDER },
        price: "79.99",
        image: { id: 34, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#000000"],
        match_data: 75,
        favourite: true,
        delivery: { date: "09.06.2023", year: 2023, delivered: true },
    },
    {
        id: 35,
        sub_category: "sandals",
        itemName: "Crocs LiteRide",
        brand: { name: "Crocs", image: PLACEHOLDER },
        price: "59.99",
        image: { id: 35, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#0055AA"],
        match_data: 79,
        favourite: false,
        delivery: { date: "17.07.2024", year: 2024, delivered: true },
    },
    {
        id: 36,
        sub_category: "football-shoes",
        itemName: "Puma Future Z",
        brand: { name: "Puma", image: PLACEHOLDER },
        price: "159.00",
        image: { id: 36, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#FFDD00"],
        match_data: 92,
        favourite: false,
        delivery: { date: "08.02.2024", year: 2024, delivered: true },
    },
    {
        id: 37,
        sub_category: "golf-shoes",
        itemName: "Ecco Biom Hybrid",
        brand: { name: "ECCO", image: PLACEHOLDER },
        price: "189.00",
        image: { id: 37, image: PLACEHOLDER },
        size: { value: "42", quantity: 1 },
        colors: ["#333333"],
        match_data: 88,
        favourite: true,
        delivery: { date: "22.04.2025", year: 2025, delivered: true },
    },
    {
        id: 38,
        sub_category: "tennis-shoes",
        itemName: "Babolat Propulse Fury",
        brand: { name: "Babolat", image: PLACEHOLDER },
        price: "149.00",
        image: { id: 38, image: PLACEHOLDER },
        size: { value: "42.5", quantity: 1 },
        colors: ["#AA33FF"],
        match_data: 86,
        favourite: false,
        delivery: { date: "18.01.2023", year: 2023, delivered: true },
    },
    {
        id: 39,
        sub_category: "climbing-shoes",
        itemName: "Five Ten Anasazi",
        brand: { name: "Five Ten", image: PLACEHOLDER },
        price: "139.00",
        image: { id: 39, image: PLACEHOLDER },
        size: { value: "41.5", quantity: 1 },
        colors: ["#FFAA00"],
        match_data: 87,
        favourite: false,
        delivery: { date: "09.03.2024", year: 2024, delivered: true },
    },
    {
        id: 40,
        sub_category: "mountain-trekking-shoes",
        itemName: "Columbia PeakFreak II",
        brand: { name: "Columbia", image: PLACEHOLDER },
        price: "129.99",
        image: { id: 40, image: PLACEHOLDER },
        size: { value: "43", quantity: 1 },
        colors: ["#00AA55"],
        match_data: 84,
        favourite: true,
        delivery: { date: "10.01.2025", year: 2025, delivered: true },
    },
];

const OrderCard = ({ item }: { item: (typeof orders)[0] }) => {
    const { isGerman } = useLanguageStore();

    return (
        <View className="flex-1 flex-row gap-4">
            {/* Left Side - Product Info */}
            <View className="flex-1 gap-2">
                <Typography variant="selected" className="text-white">
                    {item.itemName}
                </Typography>
                <Typography className="text-sm text-gray-400">
                    {isGerman() ? "Größe" : "Taglia"}: {item.size.value}
                </Typography>
                <Typography className="text-sm text-gray-400">
                    {isGerman() ? "Geliefert am" : "Consegnato il"} {item.delivery.date}
                </Typography>

                <View className="gap-2 mt-2">
                    <Button
                        className="bg-white rounded-none"
                        textClassName="text-sm text-black"
                    >
                        {isGerman() ? "Nochmal bestellen" : "Ordina di nuovo"}
                    </Button>
                    <Button
                        className="bg-primary rounded-none"
                        textClassName="text-sm text-white"
                    >
                        {isGerman() ? "Bewerten" : "Valuta"}
                    </Button>
                </View>
            </View>

            {/* Right Side - Image & Actions */}
            <View className="flex-1 gap-2">
                <View className="relative w-full aspect-square">
                    <Image
                        source={{
                            uri: item.image?.image || "",
                        }}
                        className="w-full h-full rounded"
                        resizeMode="cover"
                    />
                    {item.match_data && (
                        <View className="absolute top-2 right-2 bg-primary rounded-lg px-2 py-1">
                            <Typography className="text-white font-semibold text-xs">
                                {item.match_data}% Fit
                            </Typography>
                        </View>
                    )}
                </View>

                <Button
                    variant="outline"
                    className="border-white rounded-none"
                    textClassName="text-white text-sm"
                >
                    {isGerman() ? "Verfolgen" : "Traccia"}
                </Button>
            </View>
        </View>
    );
};

export default function Screen() {
    const { isGerman } = useLanguageStore();

    // FILTER STATES - Moved before usage
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // DYNAMIC DATA - After state declarations
    const dynamicYears = [
        {
            label: isGerman() ? "Alle Jahre" : "Tutti gli anni",
            value: "all",
        },
        ...Array.from(new Set(orders.map((o) => o.delivery.date.split(".")[2])))
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => ({ label: year, value: year })),
    ];

    const purchasedCategories = Array.from(
        new Set(orders.map((o) => o.sub_category)),
    );

    const dynamicCategories = [
        {
            label: isGerman() ? "Alle Kategorien" : "Tutte le categorie",
            value: "all",
        },
        ...categories
            .filter((c) => purchasedCategories.includes(c.slug))
            .map((c) => ({
                label: isGerman() ? c.de : c.it,
                value: c.slug,
            })),
    ];

    // FILTER LOGIC - After state and dynamic data
    const filteredOrders = orders.filter((order) => {
        const orderYear = order.delivery.date.split(".")[2];

        const matchYear =
            selectedYear === "all" ? true : orderYear === selectedYear;

        const matchCategory =
            selectedCategory === "all"
                ? true
                : order.sub_category === selectedCategory;

        return matchYear && matchCategory;
    });

    return (
        <Layout noPadding className="bg-backgroundDark">
            <ShoeHeader />

            <>
                <View className="p-3 gap-4">
                    <Typography className="text-white" variant="title">
                        {isGerman() ? "Einkäufe" : "Acquisti"}
                    </Typography>

                    {/* YEAR PICKER */}
                    <ShoppingDropDown
                        value={selectedYear}
                        onChange={(data) => setSelectedYear(data.value)}
                        list={dynamicYears}
                    />

                    {/* CATEGORY PICKER */}
                    <ShoppingDropDown
                        value={selectedCategory}
                        onChange={(data) => setSelectedCategory(data.value)}
                        list={dynamicCategories}
                    />
                </View>

                <FlatList
                    contentContainerStyle={{
                        paddingBottom: 100,
                        paddingHorizontal: 12,
                        marginTop: 20,
                    }}
                    ItemSeparatorComponent={() => (
                        <View className="h-12 flex-1 justify-center">
                            <View className="h-[1px] bg-muted-foreground"></View>
                        </View>
                    )}
                    data={filteredOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <OrderCard item={item} />}
                />
            </>
        </Layout>
    );
}
