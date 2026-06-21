"use client";

import dynamic from "next/dynamic";
import type { OnMount } from "@monaco-editor/react";
import { LoaderCircle, Play, RotateCcw, Square } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center border-4 border-slate-900 bg-slate-100 font-pixel text-xs text-slate-700">
      Loading editor...
    </div>
  ),
});

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onCancel?: () => void;
  onReset?: () => void;
  isRunning?: boolean;
  readOnly?: boolean;
  output?: string;
  friendlyError?: string | null;
  stdin?: string;
  onStdinChange?: (value: string) => void;
  inputPlaceholder?: string;
  showInput?: boolean;
  outputTruncated?: boolean;
};

export default function CodeEditor({
  value,
  onChange,
  onRun,
  onCancel,
  onReset,
  isRunning = false,
  readOnly = false,
  output = "",
  friendlyError = null,
  stdin = "",
  onStdinChange,
  inputPlaceholder = "Type program input here",
  showInput = false,
  outputTruncated = false,
}: CodeEditorProps) {
  const handleMount: OnMount = (editor, monaco) => {
    monaco.editor.defineTheme("codequest-pixel", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "7c3aed", fontStyle: "bold" },
        { token: "string", foreground: "15803d" },
        { token: "number", foreground: "c2410c" },
      ],
      colors: {
        "editor.background": "#f8fafc",
        "editor.foreground": "#0f172a",
        "editor.lineHighlightBackground": "#e0f2fe",
        "editorCursor.foreground": "#db2777",
        "editorLineNumber.foreground": "#64748b",
      },
    });
    monaco.editor.setTheme("codequest-pixel");
    editor.focus();
  };

  return (
    <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="overflow-hidden border-4 border-slate-900 bg-white shadow-[6px_6px_0_#0f172a]">
        <div className="flex items-center justify-between border-b-4 border-slate-900 bg-sky-200 px-3 py-2">
          <h2 className="font-pixel text-xs text-slate-950">Python</h2>
          <div className="flex gap-2">
            {onReset ? (
              <button
                type="button"
                title="Reset code"
                onClick={onReset}
                className="grid h-9 w-9 place-items-center border-2 border-slate-900 bg-white text-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <RotateCcw size={16} />
              </button>
            ) : null}
            {isRunning ? (
              <button type="button" title="Cancel run" onClick={onCancel} className="flex h-9 items-center gap-2 border-2 border-slate-900 bg-rose-300 px-3 font-pixel text-[10px] shadow-[2px_2px_0_#0f172a]">
                <Square size={13} fill="currentColor" /> STOP
              </button>
            ) : (
              <button type="button" title="Run code" onClick={onRun} disabled={readOnly} className="flex h-9 items-center gap-2 border-2 border-slate-900 bg-emerald-300 px-3 font-pixel text-[10px] text-slate-950 shadow-[2px_2px_0_#0f172a] disabled:cursor-not-allowed disabled:bg-slate-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                <Play size={14} fill="currentColor" /> RUN
              </button>
            )}
          </div>
        </div>
        <div className="h-[340px] sm:h-[420px] lg:h-[460px]">
          <MonacoEditor
            height="100%"
            language="python"
            value={value}
            onChange={(nextValue) => onChange(nextValue ?? "")}
            onMount={handleMount}
            options={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 15,
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 },
              readOnly,
              scrollBeyondLastLine: false,
              tabSize: 4,
              wordWrap: "on",
              automaticLayout: true,
              folding: false,
              glyphMargin: false,
              lineNumbersMinChars: 3,
            }}
          />
        </div>
        {showInput ? (
          <div className="border-t-4 border-ink bg-sky-50 p-3">
            <label htmlFor="program-input" className="font-pixel text-[10px] text-ink">Program input</label>
            <textarea id="program-input" value={stdin} onChange={(event) => onStdinChange?.(event.target.value)} placeholder={inputPlaceholder} rows={3} className="mt-2 w-full resize-y border-2 border-ink bg-white p-2 font-mono text-sm outline-none focus:ring-4 focus:ring-sky-300" />
          </div>
        ) : null}
      </div>

      <aside className="border-4 border-slate-900 bg-slate-950 text-white shadow-[6px_6px_0_#0f172a]">
        <div className="border-b-4 border-slate-900 bg-fuchsia-300 px-3 py-2 font-pixel text-xs text-slate-950">
          Output
        </div>
        <div className="min-h-[220px] whitespace-pre-wrap p-3 font-mono text-sm">
          {friendlyError ? (
            <div className="mb-3 border-2 border-rose-300 bg-rose-950 p-3 text-rose-100">
              {friendlyError}
            </div>
          ) : null}
          {isRunning ? <div className="flex items-center gap-2 font-sans text-sm"><LoaderCircle className="animate-spin" size={18} /> Running in the sandbox...</div> : output || "Run your code to see what happens."}
          {outputTruncated ? <p className="mt-3 border-2 border-amber-300 bg-amber-950 p-2 font-sans text-xs text-amber-100">Output stopped at 64 KB.</p> : null}
        </div>
      </aside>
    </section>
  );
}
