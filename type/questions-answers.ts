type QuestionAnswers = {
    question: string;
    answers: string[];
};

export type QuestionsAnswers = QuestionAnswers[];

export type CategorySlug =
    | "all"
    | "casual-sneaker"
    | "elegant-shoes"
    | "comfortable-shoes"
    | "sandals"
    | "work-shoes"
    | "miscellaneous"
    | "running-shoes"
    | "cycling-shoes"
    | "hockey-shoes"
    | "ski-boots"
    | "basketball-shoes"
    | "golf-shoes"
    | "football-shoes"
    | "tennis-shoes"
    | "climbing-shoes"
    | "mountain-trekking-shoes";
