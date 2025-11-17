import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 rounded">
      <h1 className="text-xl font-bold">⚡ Code Engine</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/editor" className="hover:text-green-400">Editor</Link>
      </div>
    </nav>
  );
}
