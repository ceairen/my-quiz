import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<>Home</>}></Route>
            <Route path="results" element={<>Results</>}></Route>
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
