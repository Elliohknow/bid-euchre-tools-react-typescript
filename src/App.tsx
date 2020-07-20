import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CTX, Game, Player } from "./ContextStore";
import { formatDateTime, UUID } from "./utils";

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

const ActiveGame: React.FC<ActiveGameProps> = ({ game, numPlayers = 4, date, players }) => {
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
interface PlayerCardProps {
  player: Player;
}
const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="player-card rising">
      <div className="player-card-items">
        <div className="player-card-item player-nickname">{player.nickname}</div>
        <div className="player-card-item player-id">{player.id}</div>
        <div className="player-card-item">{player?.gamesPlayed}</div>
        <div className="player-card-item">{player?.wins}</div>
        <div className="player-card-item">{player?.bidsTaken}</div>
        <div className="player-card-item">{player?.upRiverCount}</div>
        <div className="player-card-item">{player?.callCount}</div>
        <div className="player-card-item">{player?.luckySuit}</div>
      </div>
    </div>
  );
};
const minPlayers = 1;
const maxPlayers = 8;

const NewGameSetup: React.FC = () => {
  const { activeGames, setActiveGames, players, setPlayers } = React.useContext(CTX);
  const [ready, setReady] = React.useState(false);
  const [newGameState, setNewGameState] = React.useState({
    id: UUID(),
    dateTime: formatDateTime(),
    players: players,
    winner: null,
  });

  const handleStartGame = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setReady(true);
  };

  const handleIncrementPlayers = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (newGameState.players.length >= maxPlayers) {
      alert(`Cannot add another player. Maximum player limit reached (${maxPlayers}).`);
      return;
    }
    const playersInNewGame = newGameState.players;

    if (players.length > playersInNewGame.length) {
      let difference = players.length - playersInNewGame.length;
      // add a player that already exists in players
      const newPlayer: Player = players[players.length - difference];
      playersInNewGame.push(newPlayer); //
    } else {
      const newPlayer: Player = {
        id: `player_${playersInNewGame.length + 1}`,
        nickname: `Player ${playersInNewGame.length + 1}`,
      };

      playersInNewGame.push(newPlayer); //

      setPlayers([...players, newPlayer]); // update the base player list if new list is larger
    }

    setNewGameState({ ...newGameState, players: playersInNewGame });
  };
  const handleDecrementPlayers = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (newGameState.players.length <= minPlayers) {
      alert(`Cannot remove ${players[0].nickname}. Minimum player limit reached (${minPlayers}).`);
      return;
    }
    const playersInNewGame = newGameState.players;

    playersInNewGame.pop();
    setNewGameState({ ...newGameState, players: playersInNewGame });
  };
  return !ready ? (
    <React.Fragment>
      <div className="button-wrapper">
        <button className="btn double-btn" onClick={handleIncrementPlayers}>
          + Player
        </button>
        <button className="btn double-btn" onClick={handleDecrementPlayers}>
          - Player
        </button>
      </div>
      <button className="start-btn rising" onClick={handleStartGame}>
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
const LoadGameSetup: React.FC = () => {
  const { activeGames } = React.useContext(CTX);
  // let show;
  return <div>{activeGames}</div>;
};

const Home: React.FC = () => {
  const [gameType, setGameType] = React.useState("");
  // const { players, setPlayers, games, updateGames } = React.useContext(CTX);
  const handleNewGame = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setGameType("NEW");
  };
  const handleLoadGame = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setGameType("LOAD");
  };

  return (
    <div className="app">
      {!gameType && (
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
      {gameType === "NEW" && <NewGameSetup />}
      {gameType === "LOAD" && <LoadGameSetup />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};
export default App;
/* const deckSize = 32; (4*4) * 2 */
