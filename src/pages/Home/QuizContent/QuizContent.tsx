import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { TQuiz, TQuizQuestion } from "../../../utils/types";
import "../Home.css";

type PropsQuizContent = {
  mode: "write" | "read";
  quiz: TQuiz;
  handleCancelQuiz?: () => void;
  handleFinishQuiz?: (quiz: TQuiz) => void;
};

export default function QuizContent({
  mode,
  quiz,
  handleCancelQuiz,
  handleFinishQuiz,
}: PropsQuizContent) {
  const [currentQuiz, setCurrentQuiz] = useState<TQuiz | null>(null);
  const [finishableQuiz, setFinishableQuiz] = useState<boolean>(false);

  useEffect(() => {
    if (quiz) setCurrentQuiz((currentQuiz) => quiz);
  }, [quiz]);

  useEffect(() => {
    if (currentQuiz !== null) {
      const nullAnswersCount = currentQuiz.filter(
        (q) => q.player_answer === null
      ).length;
      if (nullAnswersCount === 0) setFinishableQuiz((finishableQuiz) => true);
    }
  }, [currentQuiz]);

  function handleWriteAnswer(quizElement: TQuizQuestion, answer: string) {
    if (currentQuiz) {
      const copyCurrentQuiz = currentQuiz;
      copyCurrentQuiz.filter(
        (question) => question.question === quizElement.question
      )[0].player_answer = answer;
      setCurrentQuiz((currentQuiz) => [...copyCurrentQuiz]);
    }
  }

  function handleConfirmAnswers() {
    if (currentQuiz !== null && handleFinishQuiz) handleFinishQuiz(currentQuiz);
  }

  function resolveButtonClass(quizElement: TQuizQuestion, answer: string) {
    if (quizElement.player_answer === null) return "";
    if (mode === "write") {
      return quizElement.player_answer === answer ? "selected" : "";
    } else {
      if (
        quizElement.player_answer === quizElement.correct_answer &&
        quizElement.player_answer === answer
      ) {
        return "success";
      }
      if (
        quizElement.incorrect_answers.includes(quizElement.player_answer) &&
        quizElement.player_answer === answer
      ) {
        return "error";
      }
      if (
        quizElement.incorrect_answers.includes(quizElement.player_answer) &&
        quizElement.correct_answer === answer
      ) {
        return "success";
      }
      return "";
    }
  }

  return (
    <>
      {currentQuiz === null ? (
        <Loader size="normal" />
      ) : (
        <div className="quizGame">
          <h1>{mode === "read" ? "Quiz Results" : "Quiz Maker"}</h1>
          <ul className="quizQuestions">
            {quiz.map((quizElement, quizIndex) => {
              return (
                <li key={quizIndex}>
                  <label>{quizElement.question}</label>
                  <ul className="quizAnswers">
                    {quizElement.randomized_answers.map(
                      (answer, answerIndex) => {
                        return (
                          <li key={answerIndex}>
                            <button
                              className={`${resolveButtonClass(
                                quizElement,
                                answer
                              )}`}
                              onClick={() =>
                                handleWriteAnswer(quizElement, answer)
                              }
                              disabled={mode === "read"}
                            >
                              {answer}
                            </button>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
          {mode === "write" ? (
            <div className="quizButtons">
              {finishableQuiz ? (
                <button onClick={handleConfirmAnswers}>Finish this quiz</button>
              ) : null}
              <button
                onClick={() => (handleCancelQuiz ? handleCancelQuiz : null)}
              >
                Cancel this quiz
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
