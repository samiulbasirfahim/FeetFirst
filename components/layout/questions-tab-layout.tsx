// components/layout/questions-tab-layout.tsx
import ProgressBar from "@/components/common/progress-bar";
import { HeaderBackButton } from "@/components/ui/header-back-button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Image, View } from "react-native";
import { OnBoardingLayout } from "./onboarding";
import { Button } from "../ui/button";
import { useQuestionStore } from "@/store/questions-answers";
import { questions } from "@/lib/category-questions";
import { CategorySlug } from "@/type/questions-answers";
import { useState } from "react";
import InfoModal from "../common/info-modal";

export function CustomTabBar({ state }: MaterialTopTabBarProps) {
    const total_pages = state.routes.length;
    const current_page = state.index + 1;

    return (
        <View className="w-full bg-background gap-2 py-2">
            <View className="w-full items-center justify-center">
                <Image
                    source={require("@/assets/images/logo-icon.png")}
                    height={50}
                    width={50}
                    style={{
                        height: 50,
                        width: 50,
                    }}
                />
            </View>
            <View className="justify-start flex-row items-center relative h-20 px-4">
                <HeaderBackButton />
                <Typography
                    variant="subtitle"
                    className="absolute left-1/2 -translate-x-1/2"
                >
                    SHOE FINDER FEETF1RST
                </Typography>
            </View>
            <View className="px-6 h-14 justify-end items-center">
                <ProgressBar totalPages={total_pages} currentPage={current_page} />
                <Typography variant="subtitle" className="mt-2">
                    {current_page}/{total_pages}
                </Typography>
            </View>
        </View>
    );
}

export function QuestionScreen({
    category,
    questionIndex,
    navigation,
}: {
    category: CategorySlug;
    questionIndex: number;
    navigation: any;
}) {
    const { isGerman } = useLanguageStore();
    const { updateAnswer, getCategoryAnswers } = useQuestionStore();
    const question = questions[category][questionIndex];

    const options = question.options.map((option: any) =>
        isGerman() ? option.de : option.it,
    );

    const calculateScreensToPop = () => {
        const screensToPop = questionIndex + 1;
        console.log(`Need to pop ${screensToPop} screens to return to main screen`);
        return screensToPop;
    };

    const questionText = isGerman() ? question.question.de : question.question.it;
    const why_important = question.why_important
        ? isGerman()
            ? question.why_important.de
            : question.why_important.it
        : null;

    const [selected, setSelected] = useState<string[]>([]);

    const handleSelectionChange = (selection: string[]) => {
        setSelected(selection);
    };

    const isLastQuestion = questionIndex === questions[category].length - 1;

    const handleNext = () => {
        const englishSelections = selected.map((selected) => {
            const option = question.options.find(
                (opt: any) => opt.de === selected || opt.it === selected,
            );
            return option ? option.eng : selected;
        });

        updateAnswer(
            category,
            questionIndex,
            question.question.eng,
            englishSelections,
        );
        console.log(
            `${category} Q${questionIndex + 1} Selection:`,
            englishSelections,
        );

        if (!isLastQuestion) {
            navigation.navigate(`question${questionIndex + 2}` as never);
        } else {
            const allAnswers = getCategoryAnswers(category);
            console.log(`ALL ${category.toUpperCase()} ANSWERS:`, allAnswers);
            const screensToPop = calculateScreensToPop();
            navigation.pop(screensToPop);
        }
    };

    const handleSkip = () => {
        if (!isLastQuestion) {
            navigation.navigate(`question${questionIndex + 2}` as never);
        } else {
            const allAnswers = getCategoryAnswers(category);
            // console.log(`ALL ${category.toUpperCase()} ANSWERS:`, allAnswers);

            const screensToPop = calculateScreensToPop();
            navigation.pop(screensToPop);
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
                    {"  "}
                    {why_important && <InfoModal info={why_important} />}
                </Typography>
            }
            options={options}
            multiple={true}
            showOtherInput={false}
            onSelectionChange={handleSelectionChange}
            FooterComponent={
                <>
                    <Button
                        variant="big"
                        textClassName="text-white font-pathSemiBold text-[16px] py-1"
                        onPress={handleNext}
                        disabled={selected.length === 0}
                    >
                        {isGerman()
                            ? isLastQuestion
                                ? "Fertig"
                                : "Nächste Frage"
                            : isLastQuestion
                                ? "Finito"
                                : "Prossima domanda"}
                    </Button>

                    <Button variant="ghost" onPress={handleSkip}>
                        {isGerman() ? "Überspringen" : "Saltare"}
                    </Button>
                </>
            }
        />
    );
}
