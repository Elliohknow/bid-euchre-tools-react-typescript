import Button from "@material-ui/core/Button";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar";
import GameTable from "./components/GameTable";
import SimpleCard from "./components/SimpleCard";
import { CTX, Game, Player } from "./ContextStore";
import { formatDateTime, getDateTimeElements, UUID } from "./utils";

const ActiveGame = () => {
  const { activeGame } = React.useContext(CTX);
  const numDummies = activeGame?.players.length <= 4 ? 4 - activeGame?.players.length : 0;
  const { day, date, time } = getDateTimeElements(activeGame?.dateTime);

  return (
    <div className="game">
      <p> game.id :{activeGame?.id}</p>
      <div className="date">
        Started on {day}, {date} at {time}
      </div>
      <div className="numPlayers">number of players: {activeGame?.players.length}</div>
      <div className="numDummies">number of dummy players: {numDummies}</div>
      <GameTable />
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

const NewGameSetup: React.FC = () => {
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
  const minPlayers = 1;
  const maxPlayers = 8;

  const handleStart = () => {
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
          + PLAYER
        </Button>
        <Button className="btn double-btn" onClick={decrementPlayers} variant="contained">
          - PLAYER
        </Button>
      </div>
      <Button component={Link} onClick={handleStart} to={`/active/?id=${newGameState.id}`} variant="contained">
        START
      </Button>
      <div className="card-wrapper" style={{ display: "grid", gridTemplateColumns: `repeat(${newGameState.players.length}, 1fr)` }}>
        {Object.keys(newGameState.players).map((value: any, index: number) => {
          return <PlayerCard player={newGameState.players[index]} key={`card_${newGameState.players[index].id}`} />;
        })}
      </div>
    </React.Fragment>
  );
};

const SavedGamesList = () => {
  const { savedGames } = React.useContext(CTX);
  return (
    <div className="saved-game-list" style={{ justifyContent: "center", textAlign: "center" }}>
      {savedGames.map((value: Game, index: number) => {
        return (
          <div className="load-game-wrapper" key={`game_${value.id}`}>
            <SimpleCard game={savedGames[index]} />
          </div>
        );
      })}
    </div>
  );
};
const Home = () => {
  return (
    <React.Fragment>
      <div className="button-wrapper">
        <Button component={Link} className="btn double-btn" to="/newgame" color="primary" variant="contained">
          NEW GAME
        </Button>
      </div>
      <SavedGamesList />
    </React.Fragment>
  );
};

const App: React.FC = () => {
  return (
    <div className="app">
      <ButtonAppBar />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/newgame" exact component={NewGameSetup} />
          <Route path="/active" component={ActiveGame} />
          <Route
            path="/"
            render={() => (
              <div style={{ textAlign: "center" }}>
                <h1>404</h1>
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
/* const deckSize = 32; (4*4) * 2 */
