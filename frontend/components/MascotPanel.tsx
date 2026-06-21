import Image from "next/image";
import { MessageSquare } from "lucide-react";

type MascotPanelProps = {
  mascot: string;
  line: string;
  worldName: string;
  spriteSrc?: string;
};

export default function MascotPanel({ mascot, line, worldName, spriteSrc }: MascotPanelProps) {
  return (
    <section className="grid gap-4 border-4 border-ink bg-white p-4 shadow-pixel md:grid-cols-[128px_minmax(0,1fr)]">
      <div className="grid aspect-square place-items-center border-4 border-ink bg-amber-100">
        {spriteSrc ? (
          <Image src={spriteSrc} alt={mascot} width={96} height={96} className="image-pixelated" />
        ) : (
          <div className="relative h-20 w-20">
            <div className="absolute left-4 top-2 h-14 w-12 border-4 border-ink bg-emerald-300" />
            <div className="absolute left-7 top-0 h-5 w-5 border-4 border-ink bg-pink-300" />
            <div className="absolute left-7 top-8 h-2 w-2 bg-ink" />
            <div className="absolute right-7 top-8 h-2 w-2 bg-ink" />
            <div className="absolute left-8 top-12 h-2 w-5 bg-ink" />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 font-pixel text-xs text-ink">
          <MessageSquare size={16} />
          {mascot} of {worldName}
        </div>
        <p className="mt-3 text-lg leading-8 text-slate-800">{line}</p>
      </div>
    </section>
  );
}
