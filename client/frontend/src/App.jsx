import { useState, useEffect } from "react";
import CodeEditor from "./components/Editor";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  const [code, setCode] = useState("// write your JS code here");
  const [output, setOutput] = useState("");
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const newWorker = new Worker(new URL("./workers/codeRunner.js", import.meta.url));
    newWorker.onmessage = (e) => {
      const { type, output } = e.data;
      setOutput(type === "success" ? output : `Error: ${output}`);
    };
    setWorker(newWorker);
    return () => newWorker.terminate();
  }, []);

  const runCode = () => {
    if (worker) {
      setOutput("Running...");
      worker.postMessage(code);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <Navbar />
      <Home />
      {/* <h1 className="text-2xl font-bold mb-2">Code Execution Engine - Client</h1> */}
      <CodeEditor code={code} setCode={setCode} />
      <button
        onClick={runCode}
        className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Run Code
      </button>
      <div className="mt-4 p-3 bg-black rounded min-h-[100px] font-mono">
        <pre>{output}</pre>
      </div>
      
    </div>
    
  );
}
