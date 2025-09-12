const optionsDE: string[] = [
    "Unter 50kg",
    "51-60 kg",
    "61-70 kg",
    "71-80 kg",
    "81-90 kg",
    "91-100 kg",
    "101-110kg",
    "Über 10kg",
];

const optionsIT: string[] = [
    "Sotto i 50 kg",
    "51-60 kg",
    "61-70 kg",
    "71-80 kg",
    "81-90 kg",
    "91-100 kg",
    "101-110 kg",
    "Oltre 10 kg",
];

import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const list = isGerman() ? optionsDE : optionsIT;
    return (
        <OnBoardingLayout
            HeaderComponent={
                <Typography variant="onboarding-header" className="text-foreground">
                    {isGerman()
                        ? "Wie viel wiegen sie ca.?"
                        : "Quanto pesano approssimativamente?"}
                </Typography>
            }
            options={list}
            multiple={false}
            showOtherInput={false}
            onSelectionChange={(selection: string[]) => {
                console.log("Selected:", selection);
            }}
            FooterComponent={
                <>
                    <Link asChild href={"/winsole-questions/after-loading/fourth"}>
                        <Button variant="big">
                            {isGerman() ? "Nächste Frage" : "Prossima domanda"}
                        </Button>
                    </Link>

                    <Link asChild href={"/winsole-questions/after-loading/fourth"}>
                        <Button variant="ghost">
                            {isGerman() ? "Überspringen" : "Saltare"}
                        </Button>
                    </Link>
                </>
            }
        />
    );
}
