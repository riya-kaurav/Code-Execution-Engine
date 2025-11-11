import { useRef } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }) {
  const editorRef = useRef();

  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value)}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </div>
  );
}
