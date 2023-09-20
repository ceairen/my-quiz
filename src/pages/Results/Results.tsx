import { useLocation, useNavigate } from "react-router-dom";
import "./Results.css";
import { useEffect, useState } from "react";
import { TQuiz } from "../../utils/types";
import Loader from "../../components/Loader/Loader";
import QuizContent from "../Home/QuizContent/QuizContent";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentQuiz, setCurrentQuiz] = useState<TQuiz | null>(null);

  function handleCreateNewQuiz() {
    navigate("/");
  }

  function countCorrectAnswers(quiz: TQuiz): number {
    return quiz.filter((q) => q.correct_answer === q.player_answer).length;
  }

  function getPClassColor(score: number) {
    return score >= 0 && score < 2
      ? "low"
      : score >= 2 && score < 4
      ? "medium"
      : "high";
  }

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    } else {
      const { quiz } = location.state;
      if (quiz) setCurrentQuiz((currentQuiz) => quiz);
    }
  }, [location]);

  return (
    <section>
      {currentQuiz === null ? (
        <Loader size="normal" />
      ) : (
        <QuizContent mode="read" quiz={currentQuiz} />
      )}
      <div className="resultsActions">
        {currentQuiz !== null ? (
          <p
            className={getPClassColor(countCorrectAnswers(currentQuiz))}
          >{`You scored ${countCorrectAnswers(currentQuiz)} out of ${
            currentQuiz.length
          }`}</p>
        ) : null}
        <button onClick={handleCreateNewQuiz}>Create a new quiz</button>
      </div>
    </section>
  );
}
