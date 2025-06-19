import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardPage from "./components/Card/CardPage";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState, useEffect } from "react";


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  });
  useEffect(() =>{
    if (darkMode){
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
      else{
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");

      }
    }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  return (
    <div className="app-wrapper">
      <button onClick={toggleTheme} className="toggle-btn">
        {darkMode ? (
          <>
            Dark Mode: <MdDarkMode/>
          </>
        ) : (
          <>
            Light Mode: <MdLightMode />
          </>
        )}
      </button>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<CardPage />} />
      </Routes>
    </Router>
    </div>

  );
}
export default App;
