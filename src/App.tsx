import React, { FC, SyntheticEvent, useContext, useState } from "react";
import { CTX, Game, Player } from "./ContextStore";
interface ActiveGameProps {
  game: Game;
  players: Player[];
  date: string | Date;
  currentDealer?: string | Player;
  currentHand?: number;
  currentLeader?: string | Player;
  highestBidder?: string | Player;
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

const ActiveGame: FC<ActiveGameProps> = ({ game, numPlayers = 4, date, players }) => {
  const numDummies = numPlayers <= 4 ? 4 - numPlayers : 0;

  return (
    <div className="game">
      <div>{game}</div>
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

const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
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
// interface NewGameProps {
//   players: Player[];
// }
const NewGameSetup: FC = () => {
  const [ready, setReady] = useState(false);
  const { players, updatePlayers } = useContext(CTX);

  const startGame = (e: SyntheticEvent) => {
    e.preventDefault();
    if (players.length > 0) {
      setReady(true);
    } else alert("Not enough players, buck-o.");
  };
  // const incrementPlayers = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   let tempArray = players;
  //   let newPlayer: Player = {
  //     id: `player${players.length + 1}`,
  //     nickname: `Player ${players.length + 1}`,
  //     gamesPlayed: 0,
  //     wins: 0,
  //     bidsTaken: 0,
  //   };
  //   tempArray.push(newPlayer);
  //   setPlayers(tempArray);
  // };
  // const decrementPlayers = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   let tempArray = players;
  //   if (tempArray.length < 1) {
  //     alert("Can't remove players that don't exist, pal.");
  //     return;
  //   }
  //   tempArray.pop();
  //   setPlayers(tempArray);
  // };
  return !ready ? (
    <React.Fragment>
      <div className="button-wrapper">
        <button
          className="btn double-btn"
          // onClick={incrementPlayers}
        >
          + Player
        </button>
        <button
          className="btn double-btn"
          // onClick={decrementPlayers}
        >
          - Player
        </button>
      </div>
      <button className="start-btn rising" onClick={startGame}>
        Start
      </button>
    </React.Fragment>
  ) : (
    <div style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)`, width: "100%" }}>
      {players.map((player: Player) => (
        <div key={`card_${player.id}`}>
          <PlayerCard player={player} />
        </div>
      ))}
    </div>
  );
};
// interface LoadGameProps {
//   activegames: Game[];
// }
const LoadGameSetup: FC = () => {
  const { activeGames } = useContext(CTX);
  let show;
  return <div>{activeGames}</div>;
};

export default function App() {
  const [gameSelected, setGameSelected] = useState("");
  // const { players, updatePlayers, games, updateGames } = useContext(CTX);
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
      {gameSelected === "NEW" && <NewGameSetup />}
      {gameSelected === "LOAD" && <LoadGameSetup />}
    </div>
  );
}
/* const deckSize = 32; (4*4) * 2 */
