import { useEffect, useState } from "react";
import apiInstance from "../../utils/api";
import { TCategory, TDifficulty } from "../../utils/types";
import "./Home.css";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<TCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const [formError, setFormError] = useState<string | null>(null);

  async function getCategories() {
    try {
      const c = await apiInstance.getCategories();
      setCategories((categories) => c);
    } catch (e) {
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
    navigate("/quiz", {
      state: {
        category: selectedCategory,
        difficulty: selectedDifficulty,
      },
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="quiz">
      {categories === null ? (
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
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button id="createBtn" onClick={handleCreateQuiz}>
            Create
          </button>
        </div>
      )}
    </section>
  );
}
