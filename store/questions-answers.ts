// store/question-store.ts
import { CategorySlug, QuestionsAnswers } from "@/type/questions-answers";
import { create } from "zustand";

interface QuestionStore {
    answers: Partial<Record<CategorySlug, QuestionsAnswers>>;

    setCategoryAnswers: (
        category: CategorySlug,
        questionsAnswers: QuestionsAnswers,
    ) => void;
    updateAnswer: (
        category: CategorySlug,
        questionIndex: number,
        question: string,
        answers: string[],
    ) => void;
    clearCategory: (category: CategorySlug) => void;
    clearAll: () => void;
    getCategoryAnswers: (category: CategorySlug) => QuestionsAnswers;
    getAllAnswers: () => Partial<Record<CategorySlug, QuestionsAnswers>>;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
    answers: {},

    setCategoryAnswers: (category, questionsAnswers) => {
        set((state) => ({
            answers: {
                ...state.answers,
                [category]: questionsAnswers,
            },
        }));
    },

    updateAnswer: (category, questionIndex, question, answers) => {
        set((state) => {
            const categoryAnswers = state.answers[category] || [];
            const updatedAnswers = [...categoryAnswers];

            if (updatedAnswers[questionIndex]) {
                updatedAnswers[questionIndex] = { question, answers };
            } else {
                updatedAnswers[questionIndex] = { question, answers };
            }

            return {
                answers: {
                    ...state.answers,
                    [category]: updatedAnswers,
                },
            };
        });
    },

    clearCategory: (category) => {
        set((state) => {
            const newAnswers = { ...state.answers };
            delete newAnswers[category];
            return { answers: newAnswers };
        });
    },

    clearAll: () => {
        set({ answers: {} });
    },

    getCategoryAnswers: (category) => {
        return get().answers[category] || [];
    },

    getAllAnswers: () => {
        return get().answers;
    },
}));
