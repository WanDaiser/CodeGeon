import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-grid text-ink">
      <section className="mx-auto grid min-h-screen max-w-7xl content-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 border-4 border-ink bg-amber-200 px-3 py-2 font-pixel text-[10px] shadow-pixel">
            <Sparkles size={15} />
            Python for first-time coders
          </div>
          <h1 className="font-pixel text-3xl leading-[1.5] sm:text-4xl lg:text-5xl">CodeQuest</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-800">
            A cute pixel-art coding adventure where beginners learn Python through tiny quests, friendly mascots, and
            instant code feedback.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/worlds" className="pixel-button">
              Enter world map
              <ArrowRight size={17} />
            </Link>
            <Link href="/level/1-1" className="pixel-button bg-white">
              Try first level
              <Code2 size={17} />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Intro", "Challenge", "Result"].map((item) => (
              <div key={item} className="border-4 border-ink bg-white p-3 shadow-pixel">
                <p className="font-pixel text-[10px]">{item}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">One focused step for young learners.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid content-center gap-4">
          <div className="border-4 border-ink bg-sky-200 p-4 shadow-pixel-lg">
            <div className="grid h-72 grid-cols-10 grid-rows-8 gap-1 border-4 border-ink bg-[#9be7ff] p-3">
              {Array.from({ length: 80 }).map((_, index) => {
                const row = Math.floor(index / 10);
                const isPath = row === 5 || index === 24 || index === 34 || index === 44;
                const isHouse = [12, 13, 22, 23, 61, 62, 71, 72].includes(index);
                return (
                  <span
                    key={index}
                    className="border border-ink/20"
                    style={{
                      backgroundColor: isHouse ? "#ffd166" : isPath ? "#f4d35e" : row > 5 ? "#7ccf7a" : "#b9fbc0",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3 border-4 border-ink bg-white p-4 shadow-pixel">
            <ShieldCheck size={24} />
            <p className="text-sm leading-6 text-slate-700">Code execution runs through a Docker sandbox with limits.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
