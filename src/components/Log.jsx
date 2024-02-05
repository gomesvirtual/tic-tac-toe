export default function Log({ logs }) {
  const newLogs = logs.map((log, index) => 
    <li key={index}>{log.playerTurn} selected {log.index}</li>)

  return (
    <ol id="log">
      {newLogs}
    </ol>
  );
}