import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "../components/Editor";

export default function EditorPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your solution here");
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/problems/${id}`)
      .then((res) => setProblem(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const runTests = async () => {
    setLoading(true);
    setVerdict("");
    setResults([]);

    try {
      const res = await axios.post("http://localhost:5000/judge/submit", {
        code,
        language,
        problemId: id,
      });

      setVerdict(res.data.verdict);
      setResults(res.data.results);

    } catch (err) {
      setVerdict("Error running code");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {problem && (
        <div className="bg-gray-800 p-5 rounded">
          <h1 className="text-3xl font-bold">{problem.title}</h1>
          <p className="mt-3">{problem.description}</p>

          <h3 className="mt-4 font-semibold">Input:</h3>
          <p>{problem.input}</p>

          <h3 className="mt-4 font-semibold">Output:</h3>
          <p>{problem.output}</p>

          <h3 className="mt-4 font-semibold">Constraints:</h3>
          <p>{problem.constraints}</p>

          <h3 className="mt-4 font-semibold">Sample Testcases:</h3>
          {problem.samples.map((s, i) => (
            <div key={i} className="bg-gray-900 mt-2 p-3 rounded">
              <p><strong>Input:</strong> {JSON.stringify(s.input)}</p>
              <p><strong>Output:</strong> {s.output}</p>
            </div>
          ))}
        </div>
      )}

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-gray-800 p-2 rounded w-40"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>

      <CodeEditor code={code} setCode={setCode} language={language} />

      <button
        onClick={runTests}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-40"
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      {verdict && (
        <div
          className={`p-3 rounded text-lg ${
            verdict === "Accepted" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {verdict}
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Test Results</h3>

          {results.map((r, i) => (
            <div
              key={i}
              className="bg-gray-900 p-2 rounded mt-2 flex justify-between"
            >
              <span>Test {i + 1}</span>
              <span className={r.pass ? "text-green-400" : "text-red-400"}>
                {r.pass ? "Passed" : "Failed"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
