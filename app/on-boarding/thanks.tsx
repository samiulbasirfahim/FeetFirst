import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ApiError } from "@/lib/fetcher";
import { useSetOnboardingQuestion } from "@/lib/queries/onboarding-question";
import { useLanguageStore } from "@/store/language";
import useOnboardingQuestionStore from "@/store/onboarding-questions";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const { getOnboardingQuestions, data } = useOnboardingQuestionStore();
    const router = useRouter();

    const { mutate: trigger, isPending } = useSetOnboardingQuestion();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        setError(null);
        trigger(getOnboardingQuestions(), {
            onSuccess: () => {
                router.replace("/(protected)/home");
            },
            onError: (err) => {
                if (err instanceof ApiError) {
                    console.log()
                    if (err.data.detail) {
                        setError(err.data.detail);
                    } else {
                        if (isGerman()) {
                            setError(
                                "Fehler beim Speichern der Antworten, bitte versuchen Sie es erneut",
                            );
                        } else {
                            setError(
                                "Errore durante il salvataggio delle risposte, per favore riprova",
                            );
                        }
                    }
                }
            },
        });
    };

    return (
        <Layout className="justify-between">
            <Typography
                variant="onboarding-header"
                className="text-white font-pathSemiBold text-[20px]"
            >
                {isGerman()
                    ? "Das war’s! Danke, dass Sie Teil der wachsenden FeetF1rst-Familie sind. Gemeinsam gestalten wir die Zukunft des Schuhkaufs."
                    : "È tutto! Grazie per far parte della crescente famiglia FeetF1rst. Insieme stiamo plasmando il futuro dell'acquisto di scarpe."}
            </Typography>

            <View>
                {error && <Typography variant="error">{error}</Typography>}

                <Button
                    variant="big"
                    disabled={isPending}
                    isLoading={isPending}
                    onPress={handleSubmit}
                    textClassName="text-white font-pathSemiBold text-[16px] py-1"
                >
                    {isGerman() ? "nächste" : "prossima"}
                </Button>
            </View>
        </Layout>
    );
}
