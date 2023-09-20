import { useState, useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import apiInstance from "../../../utils/api";
import { TCategory, TQuiz } from "../../../utils/types";
import "../Home.css";

type PropsQuizCreation = {
  handleLoadedQuiz: (quiz: TQuiz) => void;
};

export default function QuizCreation({ handleLoadedQuiz }: PropsQuizCreation) {
  const [categories, setCategories] = useState<TCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fetchQuizError, setFetchQuizError] = useState<string | null>(null);

  async function getCategories() {
    try {
      const c = await apiInstance.getCategories();
      setCategories((categories) => c);
    } catch (e) {
      console.log(e);
    }
  }

  async function getQuiz(category: string, difficulty: string) {
    setIsLoading((isLoading) => true);
    try {
      const q = await apiInstance.getQuiz(category, difficulty);
      handleLoadedQuiz(q);
    } catch (e) {
      setFetchQuizError((fetchQuizError) => e as string);
      setIsLoading((isLoading) => false);
      console.log(e);
    }
  }

  function handleCreateQuiz() {
    setFormError((formError) => null);
    if (selectedCategory === null) {
      setFormError((formError) => "Category cannot be null.");
      return;
    }
    if (selectedDifficulty === null) {
      setFormError((formError) => "Difficulty cannot be null.");
      return;
    }
    getQuiz(selectedCategory, selectedDifficulty);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isLoading || categories === null ? (
        <Loader size="normal" />
      ) : (
        <div className="quizForm">
          <h1>Quiz Maker</h1>
          {formError === null ? null : (
            <p className="quizFormError">{formError}</p>
          )}
          <div className="quizFormGroup">
            <label>Category:</label>
            <select
              id="categorySelect"
              defaultValue=""
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="quizFormGroup">
            <label>Difficulty:</label>
            <select
              id="difficultySelect"
              defaultValue=""
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="" disabled>
                Select difficulty
              </option>
              {["Easy", "Medium", "Hard"].map((v, i) => {
                return (
                  <option value={v.toLowerCase()} key={i}>
                    {v}
                  </option>
                );
              })}
            </select>
          </div>
          <button id="createBtn" onClick={handleCreateQuiz}>
            Create
          </button>
          {fetchQuizError !== null && (
            <p className="quizFormError">{fetchQuizError}</p>
          )}
        </div>
      )}
    </>
  );
}
