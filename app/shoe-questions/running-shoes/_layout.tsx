// app/(running-shoes)/_layout.tsx
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomTabBar } from "@/components/layout/questions-tab-layout";
import { runningShoes } from "@/lib/category-questions";
import { useLanguageStore } from "@/store/language";
import { useQuestionStore } from "@/store/questions-answers";
import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Typography } from "@/components/ui/typography";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Tabs = createMaterialTopTabNavigator();

const TypeSelectionComponent = (props: any) => (
    <TypeSelectionScreen {...props} />
);
TypeSelectionComponent.displayName = "running-type-selection";

function TypeSelectionScreen({ }: { navigation: any }) {
    const { isGerman } = useLanguageStore();
    const { updateAnswer } = useQuestionStore();
    const question = runningShoes.initialQuestion;

    const options = question.options.map((option) =>
        isGerman() ? option.de : option.it,
    );

    const questionText = isGerman() ? question.question.de : question.question.it;

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelectionChange = (selection: string[]) => {
        if (selection.length > 0) {
            setSelectedOption(selection[0]);

            // if (selectedOption?.nextQuestions) {
            //     router.push(
            //         `/shoe-questions/running-shoes/${selectedOption.nextQuestions}` as any,
            //     );
            // }
        }
    };

    return (
        <OnBoardingLayout
            HeaderComponent={
                <Typography
                    variant="onboarding-header"
                    className="text-white font-pathSemiBold text-[20px]"
                >
                    {questionText}
                </Typography>
            }
            options={options}
            multiple={false}
            showOtherInput={false}
            onSelectionChange={handleSelectionChange}
            FooterComponent={
                <Button
                    onPress={() => {
                        const selected = question.options.find((opt) =>
                            isGerman()
                                ? opt.de === selectedOption
                                : opt.it === selectedOption,
                        );

                        updateAnswer(
                            "running-shoes-type" as any,
                            0,
                            question.question.eng,
                            [selected!.eng],
                        );
                        if (selected?.nextQuestions) {
                            router.push(`/shoe-questions/${selected?.nextQuestions}` as any);
                            console.log(`/shoe-questions/${selected.nextQuestions}`);
                        }
                    }}
                    disabled={!selectedOption}
                    variant="big"
                    textClassName="text-white font-pathSemiBold text-[16px] py-1"
                >
                    {isGerman() ? "Nächste Frage" : "Prossima domanda"}
                </Button>
            }
        />
    );
}

export default function RunningShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen name="type" component={TypeSelectionComponent} />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}
