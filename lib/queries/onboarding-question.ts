import { useMutation, useQuery } from "@tanstack/react-query";
import { OnboardingQuestions } from "@/type/onboarding-question";
import { fetcher } from "../fetcher";

export function useSetOnboardingQuestion() {
    return useMutation({
        mutationFn: (data: OnboardingQuestions) =>
            fetcher("/api/surveys/onboarding-surveys/", {
                auth: true,
                body: data,
                method: "POST",
            }),
    });
}

export function useGetOnboardingQuestion() {
    return useMutation({
        mutationFn: () =>
            fetcher("/api/surveys/onboarding-surveys/me", {
                auth: true,
                method: "GET",
            }),
    });
}
