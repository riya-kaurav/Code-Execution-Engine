import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/Editor";

export default function EditorPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState("");

  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await axios.get(
          `http://localhost:5000/problems/${id}`   
        );
        setProblem(res.data);
      } catch (err) {
        console.log("❌ Error loading problem:", err);
      }
    }

    if (id) fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/judge/submit",     
        {
          code,
          language,
          problemId: id,
        }
      );
      setResult(res.data);
    } catch (error) {
      setResult("❌ Server Error");
      console.log(error);
    }
  };

  if (!problem)
    return (
      <div className="text-center text-gray-300 mt-10 text-xl">
        Loading Problem...
      </div>
    );

  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
      <p className="text-gray-300 mb-4">{problem.description}</p>

      <div className="space-y-2 mb-4">
        <p><strong>Input:</strong> {problem.input}</p>
        <p><strong>Output:</strong> {problem.output}</p>
        <p><strong>Constraints:</strong> {problem.constraints}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Sample Test Cases</h2>

      {problem.samples && problem.samples.length > 0 ? (
        problem.samples.map((sample, i) => (
          <div key={i} className="bg-gray-800 p-3 rounded mb-2">
            <p><strong>Input:</strong> {JSON.stringify(sample.input)}</p>
            <p><strong>Expected Output:</strong> {sample.output}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No samples available</p>
      )}

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Code Editor</h2>
        <CodeEditor code={code} setCode={setCode} language={language} />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Code
      </button>

      <div className="mt-4 bg-gray-800 p-3 rounded">
        <h2 className="text-lg font-semibold">Output:</h2>
        <pre className="text-gray-300">
          {result ? JSON.stringify(result, null, 2) : ""}
        </pre>
      </div>
    </div>
  );
}
