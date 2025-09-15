const optionsDE: string[] = [
    "Regelmäßig im Training oder Wettkampf",
    "Mehrmals pro Woche für Fitness oder Alltag",
    "Gelegentlich oder nur sporadisch",
];

const optionsIT: string[] = [
    "Regolarmente in allenamento o in gara",
    "Più volte a settimana per il fitness o per l'uso quotidiano",
    "Occasionalmente o solo sporadicamente",
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
                <Typography variant="onboarding-header" className="text-white font-pathSemiBold text-[20px]">
                    {isGerman()
                        ? "Wie intensiv nutzt du dein Rad?"
                        : "Quanto intensamente usi la tua bici?"}
                </Typography>
            }
            options={list}
            multiple={false}
            showOtherInput={false}
            onSelectionChange={(selection: string[]) => {
                console.log("Selected:", selection);
            }}
            otherPlaceholder={isGerman() ? "Bitte angeben..." : "Specifica qui..."}
            otherButtonText={
                isGerman() ? "Sonstiges (bitte angeben)" : "Altro (specificare)"
            }
            FooterComponent={
                <>
                    <Link asChild href={"/winsole-questions/after-loading/third"}>
                        <Button variant="big" textClassName="text-white font-pathSemiBold text-[16px] py-1">
                            {isGerman() ? "Nächste Frage" : "Prossima domanda"}
                        </Button>
                    </Link>

                    <Link asChild href={"/winsole-questions/after-loading/third"}>
                        <Button variant="ghost">
                            {isGerman() ? "Überspringen" : "Saltare"}
                        </Button>
                    </Link>
                </>
            }
        />
    );
}
