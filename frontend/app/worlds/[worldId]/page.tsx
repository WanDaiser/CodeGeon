import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Lock, Play } from "lucide-react";

import AlgoCanvas from "@/components/AlgoCanvas";
import MascotSprite from "@/components/MascotSprite";
import { getLevelsForWorld, getWorld } from "@/lib/content";

type WorldLevelMapPageProps = {
  params: {
    worldId: string;
  };
};

export default function WorldLevelMapPage({ params }: WorldLevelMapPageProps) {
  const worldId = Number(params.worldId);
  const world = getWorld(worldId);

  if (!world) {
    notFound();
  }

  const worldLevels = getLevelsForWorld(world.id);

  return (
    <main className="min-h-screen bg-grid px-4 py-5 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-4 border-ink bg-white p-4 shadow-pixel">
          <Link href="/worlds" className="icon-button" title="Back to worlds">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-pixel text-[10px] text-slate-600">World {world.id}</p>
            <h1 className="mt-1 font-pixel text-xl leading-8">{world.name}</h1>
          </div>
          <div className="border-2 border-ink bg-amber-200 px-3 py-2 font-pixel text-[10px]">{world.theme}</div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div
            className="border-4 border-ink p-4 shadow-pixel-lg"
            style={{ background: `linear-gradient(${world.palette.bg}, ${world.palette.ground})` }}
          >
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {worldLevels.map((level, index) => (
                <Link
                  key={level.id}
                  href={`/level/${level.id}`}
                  className="group min-h-[170px] border-4 border-ink bg-white p-3 shadow-pixel transition hover:-translate-y-1 hover:shadow-pixel-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid h-10 w-10 place-items-center border-4 border-ink bg-emerald-200 font-pixel text-xs">
                      {level.order}
                    </div>
                    {index === 0 ? <Play size={20} fill="currentColor" /> : index < 3 ? <CheckCircle2 size={20} /> : <Lock size={20} />}
                  </div>
                  <h2 className="mt-4 font-pixel text-xs leading-6">{level.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{level.concept}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="grid content-start gap-5">
            <section className="border-4 border-ink bg-white p-4 shadow-pixel">
              <div className="flex items-end gap-3">
                <MascotSprite name={world.mascot} src={world.mascotSprite} state="idle" size="sm" />
                <p className="pb-3 font-pixel text-xs">{world.mascot}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">{world.summary}</p>
            </section>
            {world.id === 6 ? <AlgoCanvas /> : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
