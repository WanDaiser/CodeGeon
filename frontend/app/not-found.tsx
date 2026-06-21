import Link from "next/link";
import { Home, Map } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-grid p-4 text-ink">
      <section className="w-full max-w-xl border-4 border-ink bg-white p-6 text-center shadow-pixel-lg">
        <p className="font-pixel text-5xl text-rose-500">404</p>
        <h1 className="mt-5 font-pixel text-base leading-7">This path is not on the map</h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">The quest may have moved, or this level has not been built yet.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="pixel-button"><Home size={16} /> Home</Link>
          <Link href="/worlds" className="pixel-button bg-sky-200"><Map size={16} /> World map</Link>
        </div>
      </section>
    </main>
  );
}
