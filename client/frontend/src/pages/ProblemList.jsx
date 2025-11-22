import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/problems")
      .then((res) => setProblems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Problems</h1>

      <div className="flex flex-col gap-4">
        {problems.map((p) => (
          <Link
            key={p.id}
            to={`/problem/${p.id}`}
            className="bg-gray-800 p-4 rounded hover:bg-gray-700"
          >
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-gray-400">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
