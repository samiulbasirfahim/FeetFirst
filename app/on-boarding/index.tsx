import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    return (
        <Layout className="justify-between">
            <Typography variant="title" className="text-foreground">
                {isGerman()
                    ? "Um deine FeetF1rst-Erfahrung einzigartig zu machen, haben wir ein paar Fragen an dich."
                    : "Per rendere unica la tua esperienza con FeetF1rst, abbiamo qualche domanda per te."}
            </Typography>

            <Link asChild href={"/on-boarding/questions"}>
                <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
            </Link>
        </Layout>
    );
}
