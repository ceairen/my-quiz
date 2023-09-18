import { TQuizQuestion } from "../../../utils/types";

type QuizAnswersProps = {
    quizElement: TQuizQuestion;
}

export default function QuizAnswers({quizElement}: QuizAnswersProps) {
  return (
    <ul className="quizAnswers">
      {quizElement.randomized_answers.map((answer, answerIndex) => {
        return (
          <li key={answerIndex}>
            <button>{answer}</button>
          </li>
        );
      })}
    </ul>
  );
}
