import { Star } from "lucide-react";

type BonusChallengeProps = {
  text?: string;
};

export default function BonusChallenge({ text }: BonusChallengeProps) {
  if (!text) {
    return null;
  }

  return (
    <aside className="border-4 border-ink bg-amber-100 p-4 shadow-pixel">
      <div className="flex items-center gap-2 font-pixel text-xs text-ink">
        <Star size={18} fill="currentColor" />
        Bonus Star
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-800">{text}</p>
    </aside>
  );
}
