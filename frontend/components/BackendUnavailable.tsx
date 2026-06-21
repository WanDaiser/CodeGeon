import { RefreshCw, ServerOff } from "lucide-react";

type BackendUnavailableProps = {
  onRetry: () => void;
};

export default function BackendUnavailable({ onRetry }: BackendUnavailableProps) {
  return (
    <section className="border-4 border-ink bg-rose-50 p-5 shadow-pixel" role="alert">
      <div className="flex items-center gap-3 font-pixel text-xs text-rose-900">
        <ServerOff size={22} />
        Code runner offline
      </div>
      <p className="mt-3 text-sm leading-6 text-rose-900">
        Your code is still safe in the editor. The execution service could not be reached, so wait a moment and try
        again.
      </p>
      <button type="button" onClick={onRetry} className="pixel-button mt-4">
        <RefreshCw size={16} />
        Retry run
      </button>
    </section>
  );
}
