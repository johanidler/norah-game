"use client";

interface PuzzleTileProps {
  tileValue: number;
  boardIndex: number;
  puzzleSize: number;
  isWon: boolean;
  onClick: () => void;
}

export default function PuzzleTile({
  tileValue,
  boardIndex,
  puzzleSize,
  isWon,
  onClick,
}: PuzzleTileProps) {
  const tileSize = puzzleSize / 3;
  const gap = 2;

  // Position on the board based on current boardIndex
  const row = Math.floor(boardIndex / 3);
  const col = boardIndex % 3;

  // Source position in the image based on tileValue
  const srcRow = Math.floor(tileValue / 3);
  const srcCol = tileValue % 3;

  // Center-crop 4:3 image to square: offset by (width - height) / 2
  // Image is 1600x1200, so cropOffsetX = (1600 - 1200) / 2 scaled to puzzle size
  // background-size makes the image puzzleSize * (4/3) wide and puzzleSize tall
  const bgWidth = puzzleSize * (4 / 3);
  const cropOffsetX = (bgWidth - puzzleSize) / 2;

  const bgPosX = -(srcCol * tileSize + cropOffsetX);
  const bgPosY = -(srcRow * tileSize);

  return (
    <div
      className="puzzle-tile absolute cursor-pointer"
      style={{
        width: tileSize - gap,
        height: tileSize - gap,
        top: row * tileSize + gap / 2,
        left: col * tileSize + gap / 2,
        backgroundImage: "url(/puzzle-image.jpg)",
        backgroundSize: `${bgWidth}px ${puzzleSize}px`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`,
        borderRadius: isWon ? 0 : 4,
        transition: "top 0.15s ease-out, left 0.15s ease-out, border-radius 0.3s ease",
      }}
      onClick={onClick}
    />
  );
}
