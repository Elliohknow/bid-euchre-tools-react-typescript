import React, { SyntheticEvent, useState } from "react";
import { Game, Player, PlayerList } from "./interfaces";

interface GameLayoutProps {
  game: Game;
  players: PlayerList;
  date?: string;
  dealer?: string;
  highestBidder?: object;
  numPlayers?: number;
}
interface PlayerCardProps {
  player: Player;
}

const dummy: Player = {
  id: "dummy",
  nickname: "Harry",
  gamesPlayed: 0,
};

const GameLayout = ({ numPlayers = 4, date, players = [dummy] }: GameLayoutProps) => {
  const numDummies = numPlayers <= 4 ? 4 - numPlayers : 0;

  return (
    <div className="game">
      <div>This is gonna be a Game, folks.</div>
      <div>Probably.</div>
      <div className="date">{date ? date : "the date string goes here"}</div>
      <div className="numPlayers">number of players: {numPlayers}</div>
      <div className="numDummies">number of dummy players: {numDummies}</div>
      {players.map((player: Player) => (
        <div key={`player_${player.id}`}>
          {" "}
          <h3>{player.nickname}</h3> <h4>{player.id}</h4>
        </div>
      ))}
    </div>
  );
};

const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <div className="rising card">
      <div>{player.id}</div>
      <div>{player.nickname}</div>
      <div>{player?.gamesPlayed}</div>
      <div>{player?.wins}</div>
      <div>{player?.bidsTaken}</div>
      <div>{player?.upRiverCount}</div>
      <div>{player?.callCount}</div>
      <div>{player?.luckySuit}</div>
    </div>
  );
};

// const NewGame = () => {
//   const [players, setPlayers]: any[] = useState([]);
//   const [ready, setReady] = useState(false);
//   let numPlayers = players.length > 1 ? players.length : 2;

//   const startGame = (e: SyntheticEvent) => {
//     e.preventDefault();
//     if (players.length > 0) {
//       setReady(true);
//     } else alert("Not enough players, buck-o.");
//   };
//   const incrementPlayers = (e: SyntheticEvent) => {
//     e.preventDefault();
//     let tempArray = players;
//     let newPlayer: Player = {
//       id: `player${players.length + 1}`,
//       nickname: `Player ${players.length + 1}`,
//       gamesPlayed: 0,
//       wins: 0,
//       bidsTaken: 0,
//     };
//     tempArray.push(newPlayer);
//     setPlayers(tempArray);
//   };
//   const decrementPlayers = (e: SyntheticEvent) => {
//     e.preventDefault();
//     let tempArray = players;
//     if (tempArray.length < 1) {
//       alert("Can't remove players that don't exist, pal.");
//       return;
//     }
//     tempArray.pop();
//     setPlayers(tempArray);
//   };
//   return !ready ? (
//     <React.Fragment>
//       <div className="button-wrapper">
//         <button className="btn double-btn" onClick={incrementPlayers}>
//           + Player
//         </button>
//         <button className="btn double-btn" onClick={decrementPlayers}>
//           - Player
//         </button>
//       </div>
//       <button className="start-btn rising" onClick={startGame}>
//         Start
//       </button>
//       <Game players={players} numPlayers={numPlayers} />
//     </React.Fragment>
//   ) : (
//     <div style={{ gridTemplateColumns: `repeat(${numPlayers}, 1fr)`, width: "100%" }}>
//       {players.map((player: Player) => (
//         <div key={`card_${player.id}`}>
//           <Card player={player} />
//         </div>
//       ))}
//     </div>
//   );
// };

const LoadGame = () => {
  return <div></div>;
};

export default function App() {
  const [gameSelected, setGameSelected] = useState("");

  const handleNewGame = (e: SyntheticEvent) => {
    e.preventDefault();
    setGameSelected("NEW");
  };
  const handleLoadGame = (e: SyntheticEvent) => {
    e.preventDefault();
    setGameSelected("LOAD");
  };

  return (
    <div className="app">
      {!gameSelected && (
        <React.Fragment>
          <h1 className="app-header">bid euchre tools</h1>
          <div className="button-wrapper">
            <button className="btn double-btn" onClick={handleNewGame}>
              new game
            </button>
            <button className="btn double-btn" onClick={handleLoadGame}>
              load game
            </button>
          </div>
        </React.Fragment>
      )}
      {
        gameSelected === "NEW" && <LoadGame />
        // <NewGame />
      }
      {gameSelected === "LOAD" && <LoadGame />}
    </div>
  );
}

// const appStyles: CSS.Properties = {
//   backgroundColor: "#EEEEEE",
//   display: "block",
//   height: "100vh",
//   width: "100%",
//   justifyContent: "space-between",
//   textAlign: "center",
//   fontSize: "16px",
// };
// const h1Styles: CSS.Properties = {
//   textTransform: "capitalize",
//   marginTop: "0",
// };
// const buttonStyles: CSS.Properties = {
//   fontWeight: "bold",
//   textTransform: "uppercase",
//   color: "white",
//   backgroundColor: "cornflowerblue",
//   cursor: "pointer",
// };
// const startButtonStyles: CSS.Properties = {
//   fontWeight: "bold",
//   fontSize: "2em",
//   textTransform: "uppercase",
//   color: "royalblue",
//   backgroundColor: "white",
//   cursor: "pointer",
// };

/* const deckSize = 32; (4*4) * 2 */
