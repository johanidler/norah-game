"use client";

import { usePuzzle } from "@/hooks/usePuzzle";
import PuzzleBoard from "./PuzzleBoard";
import GameControls from "./GameControls";

export default function PuzzleGame() {
  const { board, emptyIndex, moves, elapsed, status, handleTileClick, handleShuffle } =
    usePuzzle();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-neutral-200 mb-6">
        Norah&apos;s Puzzle
      </h1>

      <PuzzleBoard
        board={board}
        emptyIndex={emptyIndex}
        status={status}
        onTileClick={handleTileClick}
      />

      <GameControls
        moves={moves}
        elapsed={elapsed}
        status={status}
        onShuffle={handleShuffle}
      />
    </div>
  );
}
