import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import WorldMap from "@/components/WorldMap";
import { worlds } from "@/lib/content";

export default function WorldsPage() {
  return (
    <main className="min-h-screen bg-grid px-4 py-5 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-4 border-ink bg-white p-4 shadow-pixel">
          <Link href="/" className="icon-button" title="Back home">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-pixel text-[10px] text-slate-600">Choose your path</p>
            <h1 className="mt-1 font-pixel text-xl leading-8">World Map</h1>
          </div>
          <div className="border-2 border-ink bg-emerald-200 px-3 py-2 font-pixel text-[10px]">Demo build</div>
        </header>

        <WorldMap worlds={worlds} />
      </div>
    </main>
  );
}
