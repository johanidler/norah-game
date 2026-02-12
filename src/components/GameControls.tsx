"use client";

interface GameControlsProps {
  moves: number;
  elapsed: number;
  status: "idle" | "playing" | "won";
  onShuffle: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function GameControls({
  moves,
  elapsed,
  status,
  onShuffle,
}: GameControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {status === "won" && (
        <p className="text-lg text-amber-400 font-medium animate-fadeIn">
          Solved in {moves} moves &middot; {formatTime(elapsed)}
        </p>
      )}

      <div className="flex items-center gap-6 text-neutral-400 text-sm font-mono">
        <span>Moves: {moves}</span>
        <span>{formatTime(elapsed)}</span>
      </div>

      <button
        onClick={onShuffle}
        className="px-5 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-700 transition-colors cursor-pointer"
      >
        {status === "won" ? "Play Again" : "Shuffle"}
      </button>
    </div>
  );
}
