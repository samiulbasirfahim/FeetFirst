import FeetBare from "@/assets/svgs/feet-bare.svg";
import { Layout } from "@/components/layout/layout";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Portal } from "react-native-portalize";

export default function Loading({href}) {
    const { isGerman } = useLanguageStore();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prev) => Math.min(prev + 0.1, 1));
        }, 100);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (progress >= 1) {
            router.replace(href);
        }
    }, [progress]);

    return (
        <Portal>
            <Layout className="items-center justify-center gap-4">
                <CircularProgress size={140} progress={progress} strokeColor="white">
                    <FeetBare />
                </CircularProgress>
                <Typography variant="caption" className="text-center">
                    {isGerman()
                        ? "Analyse Ihres 3D-Scans für Ihre individuellen Einlegesohlen …"
                        : "Analyzing your 3D scan for your custom insoles..."}
                </Typography>
            </Layout>
        </Portal>
    );
}
