export type Board = number[];

// 3x3 grid adjacency: for each index, which indices are neighbors
const NEIGHBORS: number[][] = [
  [1, 3],       // 0
  [0, 2, 4],    // 1
  [1, 5],       // 2
  [0, 4, 6],    // 3
  [1, 3, 5, 7], // 4
  [2, 4, 8],    // 5
  [3, 7],       // 6
  [4, 6, 8],    // 7
  [5, 7],       // 8
];

const EMPTY = 8;

export function solvedBoard(): Board {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

export function countInversions(board: Board): number {
  let inversions = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === EMPTY) continue;
    for (let j = i + 1; j < board.length; j++) {
      if (board[j] === EMPTY) continue;
      if (board[i] > board[j]) inversions++;
    }
  }
  return inversions;
}

export function isSolvable(board: Board): boolean {
  return countInversions(board) % 2 === 0;
}

export function shuffleBoard(): Board {
  const board = solvedBoard();
  // Fisher-Yates shuffle
  for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
  // Fix solvability: swap two non-empty tiles if odd inversions
  if (!isSolvable(board)) {
    const nonEmpty = board.map((v, i) => ({ v, i })).filter(({ v }) => v !== EMPTY);
    const a = nonEmpty[0].i;
    const b = nonEmpty[1].i;
    [board[a], board[b]] = [board[b], board[a]];
  }
  // Ensure it's not already solved
  if (isWon(board)) return shuffleBoard();
  return board;
}

export function isWon(board: Board): boolean {
  return board.every((v, i) => v === i);
}

export function getEmptyIndex(board: Board): number {
  return board.indexOf(EMPTY);
}

export function canMove(board: Board, tileIndex: number): boolean {
  const emptyIdx = getEmptyIndex(board);
  return NEIGHBORS[emptyIdx].includes(tileIndex);
}

export function moveTile(board: Board, tileIndex: number): Board | null {
  if (!canMove(board, tileIndex)) return null;
  const newBoard = [...board];
  const emptyIdx = getEmptyIndex(board);
  [newBoard[emptyIdx], newBoard[tileIndex]] = [newBoard[tileIndex], newBoard[emptyIdx]];
  return newBoard;
}
