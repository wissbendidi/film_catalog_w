import './App.css';
import { Test } from './components/composite/Test';
import { Details } from './components/composite/Details';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="md:flex text-black dark:text-white px-20 pb-20">
          <Router>
            <Routes>
              <Route path="/" element={<Test />}/>
              <Route path="/movie/:movieId" element={<Details />}/>
            </Routes>
          </Router>
          </div>
    </>
  );
}

export default App;
