import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to CodeJudge 🚀</h1>
      <p className="mt-4 text-gray-300">
        Solve coding problems & run your code instantly.
      </p>

      <Link
        to="/problems"
        className="mt-8 inline-block bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
      >
        View Problems
      </Link>
    </div>
  );
}
