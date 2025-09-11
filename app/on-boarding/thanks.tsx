import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    return (
        <Layout className="justify-between">
        <Typography variant="onboarding-header">
                {isGerman()
                    ? "Das war’s! Danke, dass Sie Teil der wachsenden FeetF1rst-Familie sind. Gemeinsam gestalten wir die Zukunft des Schuhkaufs."
                    : "È tutto! Grazie per far parte della crescente famiglia FeetF1rst. Insieme stiamo plasmando il futuro dell'acquisto di scarpe."}
            </Typography>

            <Link asChild href={"/(protected)/home"} replace>
                <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
            </Link>
        </Layout>
    );
}
