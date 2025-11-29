import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomTabBar } from "@/components/layout/questions-tab-layout";
import { CategorySlug } from "@/type/questions-answers";
import { useLanguageStore } from "@/store/language";
import { useQuestionStore } from "@/store/questions-answers";
import { runningShoes } from "@/lib/category-questions";
import { OnBoardingLayout } from "../layout/onboarding";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { useState } from "react";
import InfoModal from "./info-modal";

const Tabs = createMaterialTopTabNavigator();

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
    const { updateAnswer, getCategoryAnswers, setShouldReset } =
        useQuestionStore();

    const [selected, setSelected] = useState<string[]>([]);
    // FIX: Properly access running shoes subcategories

    // For running shoes, we need to handle the nested structure
    // The category here should be the subcategory (allrounder, trailrunning, etc.)
    const question =
        runningShoes[category as keyof typeof runningShoes]?.[questionIndex];

    // Handle case where question is not found
    if (!question) {
        console.error(
            `Question not found for category: ${category}, index: ${questionIndex}`,
        );
        return null;
    }

    const options = question.options.map((option: any) =>
        isGerman() ? option.de : option.it,
    );

    const questionText = isGerman() ? question.question.de : question.question.it;

    const why_important = question.why_important
        ? isGerman()
            ? question.why_important.de
            : question.why_important.it
        : null;

    const handleSelectionChange = (selection: string[]) => {
        console.log("Setting reset to true on selection change");

        setShouldReset(true);
        setSelected(selection);
    };

    const calculateScreensToPop = () => {
        const screensToPop = questionIndex + 2;
        console.log(`Need to pop ${screensToPop} screens to return to main screen`);
        return screensToPop;
    };

    const questionCount =
        (runningShoes[category as keyof typeof runningShoes] as any)?.length || 0;

    const isLastQuestion = questionIndex === questionCount - 1;

    const handleNext = () => {
        const englishSelections = selected.map((selectedOption) => {
            const option = question.options.find(
                (opt: any) => opt.de === selectedOption || opt.it === selectedOption,
            );
            return option ? option.eng : selectedOption;
        });

        updateAnswer(
            "running-shoes",
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

            setShouldReset(false);

            // You might want to navigate to results or next screen here

            const screensToPop = calculateScreensToPop();
            navigation.pop(screensToPop);
        }
    };

    const handleSkip = () => {
        if (!isLastQuestion) {
            navigation.navigate(`question${questionIndex + 2}` as never);
        } else {
            const allAnswers = getCategoryAnswers(category);
            console.log(`ALL ${category.toUpperCase()} ANSWERS:`, allAnswers);
            // You might want to navigate to results or next screen here
            //
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

const createQuestionComponent = (category: string, questionIndex: number) => {
    const QuestionComponent = (props: any) => (
        <QuestionScreen
            category={category as CategorySlug}
            questionIndex={questionIndex}
            {...props}
        />
    );
    QuestionComponent.displayName = `${category}-question-${questionIndex + 1}`;
    return QuestionComponent;
};

// Allrounder Running Shoes (4 questions)
export function AllrounderRunningLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("allrounder", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("allrounder", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("allrounder", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("allrounder", 3)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Trailrunning Running Shoes (4 questions)
export function TrailrunningRunningLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("trailrunning", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("trailrunning", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("trailrunning", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("trailrunning", 3)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Long Distance Running Shoes (5 questions)
export function LongDistanceRunningLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("longDistance", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("longDistance", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("longDistance", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("longDistance", 3)}
                />
                <Tabs.Screen
                    name="question5"
                    component={createQuestionComponent("longDistance", 4)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Competition Running Shoes (4 questions)
export function CompetitionRunningLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("competition", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("competition", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("competition", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("competition", 3)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Interval Running Shoes (3 questions)
export function IntervalRunningLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("interval", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("interval", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("interval", 2)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Walking Running Shoes (3 questions)
export function WalkingRunningLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("walking", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("walking", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("walking", 2)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}
