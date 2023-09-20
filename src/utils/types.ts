export type TCategory = {
  id: number;
  name: string;
};

export type TDifficulty = "easy" | "medium" | "hard";

export type TQuizQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  randomized_answers: string[];
  player_answer: string;
  question: string;
  type: string;
};

export type TQuiz = TQuizQuestion[];
