import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-400">
        CodeJudge
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/problems" className="hover:text-blue-400">Problems</Link>
      </div>
    </nav>
  );
}
