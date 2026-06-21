import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";

type TestResultsProps = {
  passed: boolean | null;
  expectedHint: string;
  output: string;
  error?: string | null;
};

export default function TestResults({ passed, expectedHint, output, error }: TestResultsProps) {
  const icon =
    passed === null ? <CircleDashed size={20} /> : passed ? <CheckCircle2 size={20} /> : <XCircle size={20} />;

  return (
    <section className="border-4 border-ink bg-white p-4 shadow-pixel">
      <div className="flex items-center gap-2 font-pixel text-xs text-ink">
        {icon}
        Test Results
      </div>
      <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-800">
        <p>{expectedHint}</p>
        <p>
          Status:{" "}
          <span className={passed ? "font-bold text-emerald-700" : passed === false ? "font-bold text-rose-700" : ""}>
            {passed === null ? "Not run yet" : passed ? "Passed the demo check" : "Needs another try"}
          </span>
        </p>
        {error ? <p className="border-2 border-rose-300 bg-rose-50 p-2 text-rose-800">{error}</p> : null}
        {output ? <pre className="overflow-auto border-2 border-ink bg-slate-950 p-3 text-white">{output}</pre> : null}
      </div>
    </section>
  );
}
