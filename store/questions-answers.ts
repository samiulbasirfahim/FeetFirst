// store/question-store.ts
import { CategorySlug, QuestionsAnswers } from "@/type/questions-answers";
import { create } from "zustand";

interface QuestionStore {
    answers: Partial<Record<CategorySlug, QuestionsAnswers>>;
    question_depth: number;
    increaseDepth: () => void;
    resetDepth: () => void;

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
    question_depth: 0,
    increaseDepth: () =>
        set((state) => ({ question_depth: state.question_depth + 1 })),
    resetDepth: () => set({ question_depth: 0 }),

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
            updatedAnswers[questionIndex] = { question, answers };

            const compactedAnswers = updatedAnswers.filter(
                (item) => item !== null && item !== undefined,
            );

            return {
                answers: {
                    ...state.answers,
                    [category]: compactedAnswers,
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
