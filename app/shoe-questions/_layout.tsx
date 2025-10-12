// layouts/all-categories.tsx
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    CustomTabBar,
    QuestionScreen,
} from "@/components/layout/questions-tab-layout";
import { View } from "react-native";
import { Typography } from "@/components/ui/typography";

const Tabs = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// Helper function to create named components
const createQuestionComponent = (category: any, questionIndex: number) => {
    const QuestionComponent = (props: any) => (
        <QuestionScreen
            category={category}
            questionIndex={questionIndex}
            {...props}
        />
    );
    QuestionComponent.displayName = `${category}-question-${questionIndex + 1}`;
    return QuestionComponent;
};

// Casual Sneaker (3 questions)
export function CasualSneakerLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("casual-sneaker", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("casual-sneaker", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("casual-sneaker", 2)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Tennis Shoes (4 questions)
export function TennisShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("tennis-shoes", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("tennis-shoes", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("tennis-shoes", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("tennis-shoes", 3)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Basketball Shoes (2 questions)
export function BasketballShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("basketball-shoes", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("basketball-shoes", 1)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Golf Shoes (3 questions)
export function GolfShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("golf-shoes", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("golf-shoes", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("golf-shoes", 2)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Football Shoes (4 questions)
export function FootballShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("football-shoes", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("football-shoes", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("football-shoes", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("football-shoes", 3)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Climbing Shoes (5 questions)
export function ClimbingShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("climbing-shoes", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("climbing-shoes", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("climbing-shoes", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("climbing-shoes", 3)}
                />
                <Tabs.Screen
                    name="question5"
                    component={createQuestionComponent("climbing-shoes", 4)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Cycling Shoes (5 questions)
export function CyclingShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("cycling-shoes", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("cycling-shoes", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("cycling-shoes", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("cycling-shoes", 3)}
                />
                <Tabs.Screen
                    name="question5"
                    component={createQuestionComponent("cycling-shoes", 4)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

// Mountain Trekking Shoes (4 questions)
export function MountainTrekkingShoesLayout() {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Tabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                backBehavior="history"
                screenOptions={{ swipeEnabled: false, lazy: true }}
            >
                <Tabs.Screen
                    name="question1"
                    component={createQuestionComponent("mountain-trekking-shoes", 0)}
                />
                <Tabs.Screen
                    name="question2"
                    component={createQuestionComponent("mountain-trekking-shoes", 1)}
                />
                <Tabs.Screen
                    name="question3"
                    component={createQuestionComponent("mountain-trekking-shoes", 2)}
                />
                <Tabs.Screen
                    name="question4"
                    component={createQuestionComponent("mountain-trekking-shoes", 3)}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    );
}

export default function AllCategoriesStack() {
    return <TennisShoesLayout />
    return (
        <View>
            <Typography>HELLO</Typography>
        </View>
    );
}
