import { useMutation, useQuery } from "@tanstack/react-query";
import { OnboardingQuestion } from "@/type/onboarding-question";
import { fetcher } from "../fetcher";

export function useSetOnboardingQuestion() {
    return useMutation({
        mutationFn: (data: OnboardingQuestion) =>
            fetcher("/api/surveys/onboarding-surveys/", {
                auth: true,
                body: data,
                method: "POST",
            }),
    });
}

export function useGetOnboardingQuestion() {
    return useQuery({
        queryKey: ["onboarding-question"],
        queryFn: () =>
            fetcher("/api/surveys/onboarding-surveys/", {
                auth: true,
                method: "GET",
            }),
    });
}
