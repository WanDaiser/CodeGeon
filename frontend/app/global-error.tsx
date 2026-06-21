"use client";

import { RefreshCw } from "lucide-react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-screen place-items-center bg-sky-100 p-4 text-slate-950">
          <section className="w-full max-w-lg border-4 border-slate-950 bg-white p-6 text-center shadow-[8px_8px_0_#111827]">
            <h1 className="font-mono text-xl font-bold">CodeQuest hit a broken tile</h1>
            <p className="mt-3 text-sm leading-6">Your progress is still safe. Reload this screen and continue the quest.</p>
            <button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 border-4 border-slate-950 bg-emerald-300 px-4 py-3 font-mono text-xs font-bold shadow-[4px_4px_0_#111827]">
              <RefreshCw size={16} /> Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
