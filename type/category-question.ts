export interface MultiLangText {
    it: string;
    de: string;
    eng?: string;
}
export interface QuestionBlock {
    question: MultiLangText;
    why_important?: MultiLangText;
    options: MultiLangText[];
}

export type QuestionCategory = QuestionBlock[];

export interface QuestionsMap {
    [category: string]: QuestionCategory;
}
