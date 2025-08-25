import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    return (
        <Layout className="justify-between">
            <Typography variant="title" className="text-foreground">
                {isGerman()
                    ? "Welche Produkte verwendest du am häufigsten?"
                    : "Quali sono i prodotti che utilizzi di più?"}
            </Typography>

                
            <View className="gap-4 flex-row mt-16">
                    
            </View>

            <Link asChild href={"/on-boarding/foot-issues"}>
                <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
            </Link>
        </Layout>
    );
}



