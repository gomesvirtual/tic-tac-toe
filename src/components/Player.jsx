import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(prev => !prev)
    isEditing && onChangeName(symbol, playerName)
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        { !isEditing 
          ? 
          <span className="player-name">{playerName}</span> 
          :
          <input type="text" required value={playerName} onChange={handleChange} />
        }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{!isEditing ? "Edit" : "Save"}</button>
    </li> 
  );
}