import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";
import { useEffect, useState } from "react";
import apiInstance from "../../utils/api";
import { TQuiz } from "../../utils/types";
import Loader from "../../components/Loader/Loader";
import QuizAnswers from "./QuizAnswers/QuizAnswers";

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  const [quiz, setQuiz] = useState<TQuiz | null>(null);

  async function getQuiz(category: string, difficulty: string) {
    try {
      const q = await apiInstance.getQuiz(category, difficulty);
      setQuiz((quiz) => q);
    } catch (e) {
      console.log(e);
    }
  }

  function handleGoBack() {
    navigate("/");
  }

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    } else {
      const { category, difficulty } = location.state;
      getQuiz(category, difficulty);
    }
  }, [location]);

  return (
    <section>
      {quiz === null ? (
        <Loader size="normal" />
      ) : (
        <div className="quizGame">
          <h1>Quiz Maker</h1>
          <ul className="quizQuestions">
            {quiz.map((quizElement, quizIndex) => {
              return (
                <li key={quizIndex}>
                  <label>{quizElement.question}</label>
                  <QuizAnswers quizElement={quizElement} />
                </li>
              );
            })}
          </ul>
          <button onClick={handleGoBack}>Get another quiz</button>
        </div>
      )}
    </section>
  );
}
