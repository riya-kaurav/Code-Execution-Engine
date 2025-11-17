import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </div>
    </Router>
  );
}
