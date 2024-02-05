export default function Tile({ value, onTileClick }) {
  return (
    <div onClick={onTileClick} className="tile">{value}</div>
  );
}