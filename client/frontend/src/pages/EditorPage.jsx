import { useState } from "react";
import CodeEditor from "../components/Editor";

export default function EditorPage() {
  const [code, setCode] = useState('console.log("Hello from JavaScript!");');
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  // Handle language change + auto-template
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);

    if (newLang === "javascript") {
      setCode(`console.log("Hello from JavaScript!");`);
    }

    if (newLang === "python") {
      setCode(`print("Hello from Python!")`);
    }
  };

  // Run code on backend
  const runCode = async () => {
    setOutput("Running...");

    try {
      const res = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();
      setOutput(data.output || data.error);

    } catch (err) {
      setOutput("Server Error: " + err.message);
    }
  };

  return (
    <div className="text-white p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Code Editor</h1>

      {/* Language Selector */}
      <div className="flex gap-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border bg-gray-900 text-white rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>

        <button
          onClick={runCode}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Run Code
        </button>
      </div>

      {/* Editor */}
      <CodeEditor code={code} setCode={setCode} language={language} />

      {/* Output Box */}
      <div className="bg-black border border-gray-700 p-3 rounded h-40 overflow-auto">
        <strong>Output:</strong>
        <pre className="mt-2 whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}
