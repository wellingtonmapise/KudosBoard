import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardPage from "./components/Card/CardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}
export default App;
