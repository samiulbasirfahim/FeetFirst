import sports1 from "@/assets/images/sports1.png";
import sports2 from "@/assets/images/sports2.png";
import sports3 from "@/assets/images/sports3.png";
import sports4 from "@/assets/images/sports4.png";
import sports5 from "@/assets/images/sports5.png";
import sports6 from "@/assets/images/sports6.png";
import sports7 from "@/assets/images/sports7.png";
import sports8 from "@/assets/images/sports8.png";
import sports9 from "@/assets/images/sports9.png";

import normal1 from "@/assets/images/normal1.png";
import normal2 from "@/assets/images/normal2.png";
import normal3 from "@/assets/images/normal3.png";
import normal4 from "@/assets/images/normal4.png";
import normal5 from "@/assets/images/normal5.png";
import normal6 from "@/assets/images/normal6.jpg";

export type Category = {
    slug: string;
    name_it: string;
    name_de: string;
    image: any;
};

export const NormalCategories: Category[] = [
    {
        slug: "casual-sneaker",
        name_it: "Scarpe casual e sneaker",
        name_de: "Freizeitschuhe und sneakers",
        image: normal1,
    },
    {
        slug: "elegant-shoes",
        name_it: "Scrpe eleganti",
        name_de: "Elegante schuhe",
        image: normal2,
    },
    {
        slug: "comfortable-shoes",
        name_it: "Scarpe comode",
        name_de: "Bequeme schuhe",
        image: normal3,
    },
    {
        slug: "sandals",
        name_it: "Sandali",
        name_de: "Sandalen",
        image: normal4,
    },
    {
        slug: "work-shoes",
        name_it: "Scarpe da lavoro",
        name_de: "Arbeitsschuhe",
        image: normal5,
    },
    {
        slug: "miscellaneous",
        name_it: "Varie",
        name_de: "Verschiedenes",
        image: normal6,
    },
];

export const SportsCategories: Category[] = [
    {
        slug: "running-shoes",
        name_it: "Scarpe da running",
        name_de: "Laufschuhe",
        image: sports1,
    },
    {
        slug: "cycling-shoes",
        name_it: "Scarpe da ciclismo",
        name_de: "Radschuhe",
        image: sports2,
    },
    {
        slug: "hockey-shoes",
        name_it: "Scarpe da hockey",
        name_de: "Hockeyschuhe",
        image: sports3,
    },
    {
        slug: "ski-boots",
        name_it: "Scarponi da sce",
        name_de: "Skischuhe",
        image: sports4,
    },
    {
        slug: "basketball-shoes",
        name_it: "Scarpe da basket",
        name_de: "Basketballschuhe",
        image: sports5,
    },
    {
        slug: "golf-shoes",
        name_it: "Scarpe da golf",
        name_de: "Golfschuhe",
        image: sports6,
    },
    {
        slug: "football-shoes",
        name_it: "Scarpe da calcio",
        name_de: "Fussballschuhe",
        image: sports7,
    },
    {
        slug: "tennis-shoes",
        name_it: "Scarpe da tennis",
        name_de: "Tennisschuhe",
        image: sports8,
    },
    {
        slug: "climbing-shoes",
        name_it: "Scarpe da arrampicata",
        name_de: "Kletterschuhe",
        image: sports9,
    },
];
