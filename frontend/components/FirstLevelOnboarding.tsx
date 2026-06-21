"use client";

import { useEffect, useState } from "react";
import { BookOpen, Code2, Play, X } from "lucide-react";

const STORAGE_KEY = "codequest:onboarding-complete";

export default function FirstLevelOnboarding() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(window.localStorage.getItem(STORAGE_KEY) !== "true");
  }, []);

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4" role="dialog" aria-modal="true">
      <section className="w-full max-w-lg border-4 border-ink bg-white p-5 shadow-pixel-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-pixel text-[10px] text-emerald-700">Your first quest</p>
            <h2 className="mt-2 font-pixel text-base leading-7">Three small steps</h2>
          </div>
          <button type="button" className="icon-button" onClick={dismiss} title="Close onboarding">
            <X size={18} />
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          <p className="flex items-center gap-3 border-2 border-ink p-3 text-sm"><BookOpen size={19} /> Read Byte's short lesson.</p>
          <p className="flex items-center gap-3 border-2 border-ink p-3 text-sm"><Code2 size={19} /> Complete the code in the editor.</p>
          <p className="flex items-center gap-3 border-2 border-ink p-3 text-sm"><Play size={19} /> Run it and pass every hidden test.</p>
        </div>
        <button type="button" onClick={dismiss} className="pixel-button mt-5 w-full">Begin quest</button>
      </section>
    </div>
  );
}
