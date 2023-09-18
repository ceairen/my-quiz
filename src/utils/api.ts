import { TCategory, TQuiz } from "./types";
import parse from "html-react-parser";

class Api {
  baseUrl;

  constructor() {
    this.baseUrl = "https://opentdb.com/";
  }

  private shuffle(array: string[]): string[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  async getCategories(): Promise<TCategory[]> {
    try {
      const res = await fetch(`${this.baseUrl}api_category.php`);
      const json = await res.json();
      return Promise.resolve(json.trivia_categories);
    } catch (e) {
      return Promise.reject("Failed to fetch categories.");
    }
  }

  async getQuiz(category: string, difficulty: string): Promise<TQuiz> {
    try {
      const res = await fetch(
        `${this.baseUrl}api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const json = await res.json();
      const results = json.results;
      const quiz: TQuiz = results.map((r: any) => {
        let question: any = {};
        Object.entries(r).map(([k, v]) => {
          if (k === "incorrect_answers") {
            question[k] = (v as string[]).map((a) => parse(a));
          } else {
            question[k] = parse(v as string);
          }
        });
        question.randomized_answers = this.shuffle([
          ...question.incorrect_answers,
          question.correct_answer,
        ]);
        return question;
      });
      return Promise.resolve(quiz);
    } catch (e) {
      return Promise.reject("Failed to fetch categories.");
    }
  }
}

const apiInstance = new Api();

Object.freeze(apiInstance);

export default apiInstance;
