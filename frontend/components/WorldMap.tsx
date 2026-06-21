import Link from "next/link";
import { Lock, MapPin, Star } from "lucide-react";

import type { World } from "@/lib/content";

type WorldMapProps = {
  worlds: World[];
};

export default function WorldMap({ worlds }: WorldMapProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {worlds.map((world, index) => {
        const isReady = world.id <= 3;

        return (
          <Link
            key={world.id}
            href={isReady ? `/worlds/${world.id}` : "/worlds"}
            className="group block border-4 border-ink bg-white shadow-pixel transition hover:-translate-y-1 hover:shadow-pixel-lg"
            style={{ background: `linear-gradient(${world.palette.bg}, ${world.palette.ground})` }}
          >
            <div className="flex min-h-[220px] flex-col justify-between p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-pixel text-[10px] text-ink">WORLD {world.id}</p>
                  <h2 className="mt-2 font-pixel text-base leading-7 text-ink">{world.name}</h2>
                </div>
                <div className="grid h-12 w-12 place-items-center border-4 border-ink bg-white text-ink shadow-[3px_3px_0_#111827]">
                  {isReady ? <MapPin size={22} /> : <Lock size={22} />}
                </div>
              </div>

              <div className="my-5 grid h-20 grid-cols-8 items-end gap-1 border-4 border-ink bg-sky-50/70 p-2">
                {Array.from({ length: 8 }).map((_, blockIndex) => (
                  <span
                    key={blockIndex}
                    className="block border-2 border-ink"
                    style={{
                      height: `${24 + ((blockIndex + index) % 4) * 10}px`,
                      backgroundColor: blockIndex % 2 === 0 ? world.palette.accent : "#ffffff",
                    }}
                  />
                ))}
              </div>

              <div className="border-4 border-ink bg-white/90 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-pixel text-[10px] text-ink">{world.theme}</p>
                  <div className="flex text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill={world.id === 1 ? "currentColor" : "none"} />
                    <Star size={14} fill="none" />
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-800">{world.summary}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
