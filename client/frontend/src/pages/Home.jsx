
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
  <h1 className="text-4xl font-bold mb-4">Welcome to Code Engine ⚡</h1>
  <p className="text-gray-300 max-w-lg mb-6">
    Write, run, and test your JavaScript code directly in your browser sandbox.
  </p>
  <Link
    to="/editor"
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg font-semibold"
  >
    Get Started
  </Link>
</div>

  );
}

export default Home;
