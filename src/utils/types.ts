export type TCategory = {
  id: number;
  name: string;
};

export type TDifficulty = "easy" | "medium" | "hard";

export type TQuizPartialQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export interface TQuizQuestion extends TQuizPartialQuestion {
  randomized_answers: string[];
  player_answer: string | null;
}

export type TQuiz = TQuizQuestion[];
