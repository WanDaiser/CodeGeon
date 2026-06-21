import { MessageSquare } from "lucide-react";

import MascotSprite from "@/components/MascotSprite";

type MascotPanelProps = {
  mascot: string;
  line: string;
  worldName: string;
  spriteSrc: string;
  state?: "idle" | "talk" | "celebrate";
};

export default function MascotPanel({ mascot, line, worldName, spriteSrc, state = "talk" }: MascotPanelProps) {
  return (
    <section className="grid gap-4 border-4 border-ink bg-white p-4 shadow-pixel md:grid-cols-[128px_minmax(0,1fr)]">
      <div className="grid min-h-40 place-items-center overflow-hidden border-4 border-ink bg-amber-100">
        <MascotSprite name={mascot} src={spriteSrc} state={state} size="md" priority />
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
