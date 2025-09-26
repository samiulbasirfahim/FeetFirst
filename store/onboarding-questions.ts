import { OnboardingQuestions } from "@/type/onboarding-question";
import { create } from "zustand";

type OnboardingQuestionStore = {
  data: OnboardingQuestions;
  setOnboardingQuestion<K extends keyof OnboardingQuestions>(
    key: K,
    value: OnboardingQuestions[K],
  ): void;
  getOnboardingQuestions: () => OnboardingQuestions;
};

const useOnboardingQuestionStore = create<OnboardingQuestionStore>(
  (set, get) => ({
    data: {
      discovery_question: [],
      foot_problems: "",
      gender: "man",
      interests: [],
    },
    setOnboardingQuestion(key, value) {
      set((state) => ({
        data: {
          ...state.data,
          [key]: value,
        },
      }));
    },
    getOnboardingQuestions() {
      return get().data;
    },
  }),
);

export default useOnboardingQuestionStore;
