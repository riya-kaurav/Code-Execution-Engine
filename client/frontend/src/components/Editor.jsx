import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language }) {
  return (
    <div className="h-full">
      <Editor
        height="65vh"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
}

