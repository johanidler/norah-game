"use client";

import { useRef, useState, useEffect } from "react";
import PuzzleTile from "./PuzzleTile";
import { Board } from "@/lib/puzzle-utils";

interface PuzzleBoardProps {
  board: Board;
  emptyIndex: number;
  status: "idle" | "playing" | "won";
  onTileClick: (index: number) => void;
}

const EMPTY = 8;

export default function PuzzleBoard({
  board,
  emptyIndex,
  status,
  onTileClick,
}: PuzzleBoardProps) {
  const isWon = status === "won";
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(450);

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setSize(containerRef.current.clientWidth);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto ${isWon ? "puzzle-won" : ""}`}
      style={{
        width: "min(450px, 90vw)",
        height: "min(450px, 90vw)",
      }}
    >
      {board.map((tileValue, boardIndex) => {
        if (tileValue === EMPTY && !isWon) return null;

        return (
          <PuzzleTile
            key={tileValue}
            tileValue={tileValue}
            boardIndex={boardIndex}
            puzzleSize={size}
            isWon={isWon}
            onClick={() => onTileClick(boardIndex)}
          />
        );
      })}
    </div>
  );
}
