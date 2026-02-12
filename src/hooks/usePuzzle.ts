"use client";

import { useReducer, useEffect, useCallback } from "react";
import {
  Board,
  solvedBoard,
  shuffleBoard,
  moveTile,
  isWon,
  getEmptyIndex,
} from "@/lib/puzzle-utils";

type Status = "idle" | "playing" | "won";

interface State {
  board: Board;
  moves: number;
  startTime: number | null;
  elapsed: number;
  status: Status;
}

type Action =
  | { type: "SHUFFLE" }
  | { type: "MOVE"; tileIndex: number }
  | { type: "TICK" }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SHUFFLE":
    case "RESET":
      return {
        board: shuffleBoard(),
        moves: 0,
        startTime: null,
        elapsed: 0,
        status: "idle",
      };

    case "MOVE": {
      if (state.status === "won") return state;
      const newBoard = moveTile(state.board, action.tileIndex);
      if (!newBoard) return state;

      const isFirstMove = state.status === "idle";
      const won = isWon(newBoard);

      return {
        board: newBoard,
        moves: state.moves + 1,
        startTime: isFirstMove ? Date.now() : state.startTime,
        elapsed: isFirstMove ? 0 : state.elapsed,
        status: won ? "won" : "playing",
      };
    }

    case "TICK": {
      if (state.status !== "playing" || !state.startTime) return state;
      return {
        ...state,
        elapsed: Math.floor((Date.now() - state.startTime) / 1000),
      };
    }

    default:
      return state;
  }
}

const initialState: State = {
  board: solvedBoard(),
  moves: 0,
  startTime: null,
  elapsed: 0,
  status: "idle",
};

export function usePuzzle() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Shuffle on mount
  useEffect(() => {
    dispatch({ type: "SHUFFLE" });
  }, []);

  // Timer
  useEffect(() => {
    if (state.status !== "playing") return;
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [state.status]);

  const handleTileClick = useCallback((tileIndex: number) => {
    dispatch({ type: "MOVE", tileIndex });
  }, []);

  const handleShuffle = useCallback(() => {
    dispatch({ type: "SHUFFLE" });
  }, []);

  return {
    board: state.board,
    emptyIndex: getEmptyIndex(state.board),
    moves: state.moves,
    elapsed: state.elapsed,
    status: state.status,
    handleTileClick,
    handleShuffle,
  };
}
