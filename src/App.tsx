import Button from "@material-ui/core/Button";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { CTX, Player } from "./ContextStore";
import { formatDateTime, UUID } from "./utils";

// interface ActiveGameProps {
//   game: Game;
//   date: string | Date;
//   currentDealer?: string | Player;
//   currentHand?: number;
//   currentLeader?: string | Player;
//   highestBidder?: string | Player;
//   numPlayers?: number;
// }

const ActiveGame: React.FC = () => {
  const { savedGames } = React.useContext(CTX);
  const [game, setGame] = React.useState(savedGames[savedGames.length - 1]);
  const numDummies = game?.players.length <= 4 ? 4 - game?.players.length : 0;
  React.useEffect(() => setGame(savedGames[savedGames.length - 1]), []);
  return (
    <div className="game">
      {/* <div>{game}</div> */}
      <div className="date">the date string goes here</div>
      <div className="numPlayers">number of players: {game?.players.length}</div>
      <div className="numDummies">number of dummy players: {numDummies}</div>
      {game.players.map((player: Player) => (
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
    <div className="player-card-items">
      <h3 className="player-card-item player-nickname">{player.nickname}</h3>
      <p className="player-card-item player-id">id: {player.id}</p>
      <p className="player-card-item">Games Played: {player?.gamesPlayed || "¯\\_(ツ)_/¯"}</p>
      <p className="player-card-item">Wins: {player?.wins || "¯\\_(ツ)_/¯"}</p>
      <p className="player-card-item">Bids Taken: {player?.bidsTaken || "¯\\_(ツ)_/¯"}</p>
      <p className="player-card-item">Up-The-River Count: {player?.upRiverCount || "¯\\_(ツ)_/¯"}</p>
      <p className="player-card-item">Call Count: {player?.callCount || "¯\\_(ツ)_/¯"}</p>
      <p className="player-card-item">Lucky Suit: {player?.luckySuit || "¯\\_(ツ)_/¯"}</p>
    </div>
  );
};
const minPlayers = 1;
const maxPlayers = 8;

const NewGameSetup = () => {
  const { savedGames, setSavedGames, players, setPlayers } = React.useContext(CTX);
  const [newGameState, setNewGameState] = React.useState({
    id: UUID(),
    dateTime: formatDateTime(),
    players: players,
    winner: null,
  });
  React.useEffect(() => {
    console.table(savedGames);
    console.table(players);
    console.table(newGameState);
  }, []);
  const handleStart = (e: React.SyntheticEvent) => {
    setSavedGames([...savedGames, newGameState]);
  };

  const incrementPlayers = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
      playersInNewGame.push(newPlayer); // add new player to game's player array
      setPlayers([...players, newPlayer]); // update the base player list if new list is larger
    }
    setNewGameState({ ...newGameState, players: playersInNewGame });
  };
  const decrementPlayers = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (newGameState.players.length <= minPlayers) {
      alert(`Cannot remove ${players[0].nickname}. Minimum player limit reached (${minPlayers}).`);
      return;
    }
    const playersInNewGame = newGameState.players;

    playersInNewGame.pop();
    setNewGameState({ ...newGameState, players: playersInNewGame });
  };

  return (
    <React.Fragment>
      <div className="button-wrapper">
        <Button className="btn double-btn" onClick={incrementPlayers} variant="contained">
          + Player
        </Button>
        <Button className="btn double-btn" onClick={decrementPlayers} variant="contained">
          - Player
        </Button>
      </div>
      <Button component={Link} onClick={handleStart} to={`/active/${newGameState.players.length}/${newGameState.id}`} variant="contained">
        Start
      </Button>
      <div className="card-wrapper" style={{ display: "grid", gridTemplateColumns: `repeat(${newGameState.players.length}, 1fr)` }}>
        {Object.keys(newGameState.players).map((value: any, index: number) => {
          return <PlayerCard player={newGameState.players[index]} key={`card_${newGameState.players[index].id}`} />;
        })}
      </div>
    </React.Fragment>
  );
};
// interface LoadGameProps {
//   savedGames: Game[];
// }
const LoadGameSetup: React.FC = () => {
  const { savedGames } = React.useContext(CTX);
  // let show;
  return <div>{savedGames}</div>;
};

const Home: React.FC = () => {
  return (
    <div className="button-wrapper">
      <Button component={Link} className="btn double-btn" to="/newgame" color="primary" variant="contained">
        new game
      </Button>
      <Button component={Link} className="btn double-btn" to="/loadgame" color="primary" variant="contained">
        load game
      </Button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="app-header">bid euchre tools</h1>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/newgame" exact component={NewGameSetup} />
          <Route path="/loadgame" exact component={LoadGameSetup} />
          <Route path="/active" component={ActiveGame} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
/* const deckSize = 32; (4*4) * 2 */
