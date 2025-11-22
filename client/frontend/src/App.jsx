import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Problems from "./pages/ProblemList";
import EditorPage from "./pages/EditorPage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problem/:id" element={<EditorPage />} />
        </Routes>
      </div>
    </Router>
  );
}
