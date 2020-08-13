import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import BasicAppBar from "./components/BasicAppBar";
import GameCard from "./components/GameCard";
import GameTable from "./components/GameTable";
import PlayerCard from "./components/PlayerCard";
import { CTX, Game, Player } from "./ContextStore";
import { formatDateTime, getDateTimeElements, UUID } from "./utils";
// import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined";
// import RecentActorsIcon from "@material-ui/icons/RecentActors";

const ActiveGame: React.FC = () => {
  const { activeGame, setActiveGame } = React.useContext(CTX);
  // const [turnCount, setTurnVout]
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
      <GameTable activeGame={activeGame} setActiveGame={setActiveGame} />
    </div>
  );
};

const NewGameSetup: React.FC = () => {
  const [newPlayers, setNewPlayers] = React.useState(new Array());
  const [newGameState, setNewGameState] = React.useState({
    id: UUID(),
    dateTime: formatDateTime(),
    players: newPlayers,
    winner: null,
  });
  const { savedGames, setSavedGames, players } = React.useContext(CTX);

  React.useEffect(() => {
    console.log(`%c SAVED GAMES: ${savedGames}`, "color:cornflowerblue");
    console.log(`%c PLAYERS: ${players}`, "color:skyblue");
    console.log(`%c NEW GAME STATE: ${newGameState}`, "color:royalblue");

    setNewGameState({ ...newGameState, players: newPlayers });
  }, [newPlayers]);

  const handleStart = () => {
    setSavedGames([...savedGames, newGameState]);
  };

  const onToggle = (newPlayer: Player) => {
    let currentPlayers = newGameState.players;
    //console.log(`%c CURRENTPLAYERS.length: ${currentPlayers?.length}`, "color:green");
    const index = currentPlayers.findIndex((value: Player) => value === newPlayer);
    //if it exists, delete it. if it doesn't, add it
    if (index > -1) {
      currentPlayers.splice(index, 1);
    } else {
      currentPlayers.push(newPlayer);
    }

    setNewPlayers(currentPlayers);
  };

  return (
    <React.Fragment>
      <Button
        color="primary"
        component={Link}
        onClick={handleStart}
        to={`/active/?id=${newGameState.id}`}
        variant="contained"
        endIcon={<DoubleArrowIcon fontSize="large" />}
      >
        START
      </Button>
      <div className="select-player-wrapper" style={{ display: "grid", gridTemplateColumns: `repeat(${players.length + 1}, 1fr)` }}>
        {Object.keys(players).map((value: any, index: number) => {
          return <PlayerCard onToggle={onToggle} player={players[index]} key={`card_${players[index].id}`} />;
        })}
        <AddPlayerCard />
      </div>
    </React.Fragment>
  );
};
const AddPlayerCard: React.FC = () => {
  return (
    <div className="player-card-items">
      <IconButton size="medium" aria-label="add new player">
        <PersonAddIcon fontSize="large" />
      </IconButton>
      <h3 className="player-card-item">Add Player</h3>
    </div>
  );
};

const SavedGamesList = () => {
  const { savedGames } = React.useContext(CTX);
  return (
    <ul className="saved-game-list">
      {savedGames.map((value: Game, index: number) => {
        return (
          <li className="game-card-wrapper" key={`game_${value.id}`}>
            <GameCard game={savedGames[index]} />
          </li>
        );
      })}
    </ul>
  );
};

const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.getContrastText(purple[400]),
      backgroundColor: purple[400],
      "&:hover": {
        backgroundColor: purple[600],
      },
    },
  })
);

const Home = () => {
  const classes = useButtonStyles();
  return (
    <React.Fragment>
      <div className="button-wrapper">
        <Button component={Link} size="large" className={classes.root} to="/newgame" color="primary" variant="contained">
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
      <BasicAppBar />
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
