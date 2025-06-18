import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardDetails from "./components/Board/BoardDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<BoardDetails/>} />
      </Routes>
    </Router>
  );
}
export default App;
