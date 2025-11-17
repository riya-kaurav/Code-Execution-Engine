import { useRef } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language }) {
  const editorRef = useRef();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-full border border-gray-700 rounded overflow-hidden">
      <Editor
        height="60vh"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
