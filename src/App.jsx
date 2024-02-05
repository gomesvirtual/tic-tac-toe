import { useEffect, useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import GameOver from "./components/GameOver";

const position = ["1,1", "1,2", "1,3", "2,1", "2,2", "2,3", "3,1", "3,2", "3,3"];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2] },
  { combo: [3, 4, 5] },
  { combo: [6, 7, 8] },

  //Columns
  { combo: [0, 3, 6] },
  { combo: [1, 4, 7] },
  { combo: [2, 5, 8] },

  //Diagonals
  { combo: [0, 4, 8] },
  { combo: [2, 4, 6] }
];

let winner = "";
let hasDraw = false;
let gameInProgress = true;

function checkWinner(tiles, players) {
  for (const {combo} of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (tileValue1 && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
      winner = players[tileValue1];
      gameInProgress = false;
      return;
    }
  }

  hasDraw = tiles.every(tile => tile)
}

function App() {
  const [tiles, setTiles] = useState(Array(9).fill(null))
  const [playerTurn, setPlayerTurn] = useState("X")
  const [logs, setLogs] = useState([])
  const [players, setPlayers] = useState(PLAYERS)

  checkWinner(tiles, players)

  function handleTileClick(index) {
    if (tiles[index] || !gameInProgress) {
      return;
    }
    setTiles(prev => {
      prev[index] = playerTurn
      return prev
    })  
    setLogs(prev => [
        {playerTurn, index: position[index]},
        ...prev,
    ])  
    setPlayerTurn(prev => prev === "X" ? "O" : "X")
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prev => ({
      ...prev,
      [symbol]: newName
    }))
  }

  function handleReset() {
    setTiles(Array(9).fill(null))
    setPlayerTurn("X")
    setLogs([])
    winner = ""
    hasDraw = false
    gameInProgress = true
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive={playerTurn === "X"} 
            onChangeName={handlePlayerNameChange}
          />         
          <Player 
            initialName={PLAYERS.O  } 
            symbol="O" 
            isActive={playerTurn === "O"} 
            onChangeName={handlePlayerNameChange}
          /> 
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard tiles={tiles} onTileClick={handleTileClick} />
      </div>
      <Log logs={logs} />
    </main>
  )
}

export default App
