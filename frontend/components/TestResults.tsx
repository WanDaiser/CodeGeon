import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";

type TestResultsProps = {
  passed: boolean | null;
  expectedHint: string;
  output: string;
  error?: string | null;
  rawError?: string;
  testsPassed: number;
  testsTotal: number;
  testResults: boolean[];
};

export default function TestResults({ passed, expectedHint, output, error, rawError, testsPassed, testsTotal, testResults }: TestResultsProps) {
  const icon =
    passed === null ? <CircleDashed size={20} /> : passed ? <CheckCircle2 size={20} /> : <XCircle size={20} />;

  return (
    <section className="border-4 border-ink bg-white p-4 shadow-pixel">
      <div className="flex items-center gap-2 font-pixel text-xs text-ink">
        {icon}
        Test Results
      </div>
      <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-800">
        <div className="grid grid-cols-2 gap-3">
          <div className="border-2 border-ink bg-emerald-50 p-3"><strong className="block font-pixel text-lg text-emerald-700">{testsPassed}</strong><span>Passed</span></div>
          <div className="border-2 border-ink bg-rose-50 p-3"><strong className="block font-pixel text-lg text-rose-700">{Math.max(0, testsTotal - testsPassed)}</strong><span>Remaining</span></div>
        </div>
        {testResults.length ? <div className="flex flex-wrap gap-2" aria-label="Individual hidden test results">{testResults.map((result, index) => <span key={index} className={`grid h-8 w-8 place-items-center border-2 border-ink font-pixel text-[9px] ${result ? "bg-emerald-200" : "bg-rose-200"}`}>{index + 1}</span>)}</div> : null}
        <p>{expectedHint}</p>
        <p>
          Status:{" "}
          <span className={passed ? "font-bold text-emerald-700" : passed === false ? "font-bold text-rose-700" : ""}>
            {passed === null ? "Not run yet" : passed ? "Passed every hidden test" : "Needs another try"}
          </span>
        </p>
        {error ? <p className="border-2 border-rose-300 bg-rose-50 p-2 text-rose-800">{error}</p> : null}
        {rawError ? <details className="border-2 border-slate-300 bg-slate-50 p-2"><summary className="cursor-pointer font-semibold">See full error</summary><pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">{rawError}</pre></details> : null}
        {output ? <pre className="overflow-auto border-2 border-ink bg-slate-950 p-3 text-white">{output}</pre> : null}
      </div>
    </section>
  );
}
