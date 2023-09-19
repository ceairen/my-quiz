import { useState } from "react";
import { TQuiz } from "../../utils/types";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import QuizCreation from "./QuizCreation/QuizCreation";
import QuizContent from "./QuizContent/QuizContent";

export default function Home() {
  const navigate = useNavigate();

  const [currentQuiz, setCurrentQuiz] = useState<TQuiz | null>(null);

  function handleFinishQuiz(quiz: TQuiz) {
    navigate("/results", {
      state: {
        quiz: quiz,
      },
    });
  }

  return (
    <section className="quiz">
      {
        currentQuiz === null
        ? <QuizCreation handleLoadedQuiz={(quiz) => setCurrentQuiz(quiz)} />
        : <QuizContent mode="write" quiz={currentQuiz} handleCancelQuiz={() => setCurrentQuiz(null)} handleFinishQuiz={handleFinishQuiz} />
      }
    </section>
  );
}
