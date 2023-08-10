export type Question = {
  id: string;
  category: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  regions: string[];
  isNiche: boolean;
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
  type: "text_choice";
};
