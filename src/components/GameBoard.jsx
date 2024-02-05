import Tile from "./Tile";

export default function GameBoard({ tiles, onTileClick }) {
  const boardTiles = tiles.map((tile, index) => 
    <Tile key={index} value={tile} onTileClick={() => onTileClick(index)} />
  )

  return (
    <div className="game-board">
      {boardTiles}
    </div>
  );
}