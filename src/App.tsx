import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Results from "./pages/Results/Results";
import Quiz from "./pages/Quiz/Quiz";
import { Helmet } from "react-helmet";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Helmet>
          <title>My Quiz</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </Helmet>
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="quiz" element={<Quiz />}></Route>
            <Route path="results" element={<Results />}></Route>
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
