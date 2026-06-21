"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Check, Code2, Trophy } from "lucide-react";

import BonusChallenge from "@/components/BonusChallenge";
import BackendUnavailable from "@/components/BackendUnavailable";
import CodeEditor from "@/components/CodeEditor";
import FirstLevelOnboarding from "@/components/FirstLevelOnboarding";
import MascotPanel from "@/components/MascotPanel";
import TestResults from "@/components/TestResults";
import type { Level, World } from "@/lib/content";

type ExecuteResponse = {
  stdout: string;
  stderr: string;
  exit_code: number | null;
  timed_out: boolean;
  duration_ms: number;
  friendly_error: string | null;
  error_type: string | null;
  output_truncated: boolean;
  cancelled: boolean;
  tests_passed: number;
  tests_total: number;
  test_results: boolean[];
};

type LevelExperienceProps = {
  level: Level;
  world: World;
};

const tabs = [
  { id: "intro", label: "Intro", icon: BookOpen },
  { id: "challenge", label: "Code", icon: Code2 },
  { id: "result", label: "Result", icon: Trophy },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function LevelExperience({ level, world }: LevelExperienceProps) {
  const [activeTab, setActiveTab] = useState<TabId>("intro");
  const [code, setCode] = useState(level.starterCode);
  const [stdin, setStdin] = useState(level.inputPlaceholder ?? "");
  const [output, setOutput] = useState("");
  const [friendlyError, setFriendlyError] = useState<string | null>(null);
  const [rawError, setRawError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [passed, setPassed] = useState<boolean | null>(null);
  const [testsPassed, setTestsPassed] = useState(0);
  const [testsTotal, setTestsTotal] = useState(0);
  const [testResults, setTestResults] = useState<boolean[]>([]);
  const [outputTruncated, setOutputTruncated] = useState(false);
  const [backendUnavailable, setBackendUnavailable] = useState(false);
  const abortController = useRef<AbortController | null>(null);
  const activeRequestId = useRef<string | null>(null);

  const apiUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000", []);

  function clearResult() {
    setOutput("");
    setFriendlyError(null);
    setRawError("");
    setPassed(null);
    setTestsPassed(0);
    setTestsTotal(0);
    setTestResults([]);
    setOutputTruncated(false);
    setBackendUnavailable(false);
  }

  function changeCode(nextCode: string) {
    setCode(nextCode);
    clearResult();
  }

  function changeStdin(nextStdin: string) {
    setStdin(nextStdin);
    clearResult();
  }

  async function runCode() {
    setIsRunning(true);
    setFriendlyError(null);
    setRawError("");
    setOutput("");
    setBackendUnavailable(false);
    const requestId = crypto.randomUUID();
    const controller = new AbortController();
    activeRequestId.current = requestId;
    abortController.current = controller;

    try {
      const response = await fetch(`${apiUrl}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, stdin, challenge_id: level.id, request_id: requestId }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 503) setBackendUnavailable(true);
        if (response.status === 429) throw new Error("Too many runs. Take a short break, then try again.");
        throw new Error(`Backend returned ${response.status}`);
      }

      const result = (await response.json()) as ExecuteResponse;
      setOutput(result.stdout);
      setFriendlyError(result.friendly_error);
      setRawError(result.stderr);
      setTestsPassed(result.tests_passed);
      setTestsTotal(result.tests_total);
      setTestResults(result.test_results);
      setOutputTruncated(result.output_truncated);
      setPassed(result.tests_total > 0 && result.tests_passed === result.tests_total);
      setActiveTab("result");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setFriendlyError("Code run cancelled.");
        return;
      }
      setPassed(false);
      setBackendUnavailable(true);
      setFriendlyError(error instanceof Error && error.message.startsWith("Too many") ? error.message : "The CodeQuest backend is not ready yet. Your code is still saved in the editor.");
      setRawError(error instanceof Error ? error.message : "Unknown connection error");
      setActiveTab("result");
    } finally {
      setIsRunning(false);
      abortController.current = null;
      activeRequestId.current = null;
    }
  }

  async function cancelRun() {
    const requestId = activeRequestId.current;
    abortController.current?.abort();
    setIsRunning(false);
    setFriendlyError("Code run cancelled.");
    if (requestId) {
      await fetch(`${apiUrl}/execute/${requestId}`, { method: "DELETE" }).catch(() => undefined);
    }
  }

  return (
    <div className="min-h-screen bg-grid px-4 py-5 text-ink sm:px-6 lg:px-8">
      {level.id === "1-1" ? <FirstLevelOnboarding /> : null}
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 border-4 border-ink bg-white p-3 shadow-pixel">
          <Link href={`/worlds/${world.id}`} className="icon-button" title="Back to level map">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-pixel text-[10px] text-slate-600">{world.name} / Level {level.order}</p>
            <h1 className="mt-1 font-pixel text-base leading-7">{level.title}</h1>
          </div>
          <div className="border-2 border-ink bg-amber-200 px-3 py-2 font-pixel text-[10px]">{level.concept}</div>
        </header>

        <nav className="mt-5 grid grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-12 items-center justify-center gap-2 border-4 border-ink font-pixel text-[10px] shadow-pixel ${
                  isActive ? "bg-emerald-300" : "bg-white"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="mt-5"
        >
          {activeTab === "intro" ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <MascotPanel
                mascot={world.mascot}
                spriteSrc={world.mascotSprite}
                worldName={world.name}
                line={level.mascotLine}
              />
              <section className="border-4 border-ink bg-white p-4 shadow-pixel">
                <h2 className="font-pixel text-xs">Quest Task</h2>
                <p className="mt-3 text-base leading-7 text-slate-800">{level.taskDescription}</p>
                <ul className="mt-4 grid gap-2">
                  {level.lesson.map((point) => <li key={point} className="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 text-sm leading-6 text-slate-800">{point}</li>)}
                </ul>
                <button type="button" onClick={() => setActiveTab("challenge")} className="pixel-button mt-5">
                  Start coding
                  <ArrowRight size={16} />
                </button>
              </section>
            </div>
          ) : null}

          {activeTab === "challenge" ? (
            <div className="grid gap-5">
              <section className="border-4 border-ink bg-white p-4 shadow-pixel">
                <h2 className="font-pixel text-xs">Challenge</h2>
                <p className="mt-3 text-base leading-7 text-slate-800">{level.taskDescription}</p>
              </section>
              <CodeEditor
                value={code}
                onChange={changeCode}
                onRun={runCode}
                onCancel={cancelRun}
                onReset={() => changeCode(level.starterCode)}
                isRunning={isRunning}
                output={output || rawError}
                friendlyError={friendlyError}
                stdin={stdin}
                onStdinChange={changeStdin}
                inputPlaceholder={level.inputPlaceholder}
                showInput={level.usesInput}
                outputTruncated={outputTruncated}
              />
            </div>
          ) : null}

          {activeTab === "result" ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="grid gap-5">
                {backendUnavailable ? <BackendUnavailable onRetry={runCode} /> : null}
                <TestResults passed={passed} expectedHint={level.expectedHint} output={output} error={friendlyError} rawError={rawError} testsPassed={testsPassed} testsTotal={testsTotal} testResults={testResults} />
              </div>
              <div className="grid content-start gap-5">
                {passed ? <MascotPanel mascot={world.mascot} spriteSrc={world.mascotSprite} worldName={world.name} line="Every hidden test passed. That solution is ready for the next quest!" state="celebrate" /> : null}
                <section className="border-4 border-ink bg-white p-4 shadow-pixel">
                  <div className="flex items-center gap-2 font-pixel text-xs">
                    <Check size={18} />
                    Next Step
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-800">
                    {passed
                      ? "Nice. You can move to the next level map tile or try the bonus star."
                      : "Read the friendly hint, adjust your code, and run it again."}
                  </p>
                  <button type="button" onClick={() => setActiveTab("challenge")} className="pixel-button mt-4">
                    Try again
                    <Code2 size={16} />
                  </button>
                </section>
                <BonusChallenge text={level.bonus} />
              </div>
            </div>
          ) : null}
        </motion.main>
      </div>
    </div>
  );
}
