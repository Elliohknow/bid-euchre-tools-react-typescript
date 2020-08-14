import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import BasicAppBar from "./components/BasicAppBar";
import GameCard from "./components/GameCard";
import PlayerCard from "./components/PlayerCard";
import GameTable from "./components/Table";
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
      <GameTable />
    </div>
  );
};

const NewGameSetup: React.FC = () => {
  const { setActiveGame, savedGames, setSavedGames, players } = React.useContext(CTX);
  const [newGameState, setNewGameState] = React.useState({
    id: UUID(),
    dateTime: formatDateTime(),
    players: players,
    winner: null,
  });

  React.useEffect(() => {
    console.table(savedGames);
    console.table(players);

    // setNewGameState({ ...newGameState, players: players });
    console.table(newGameState);
    console.table(newGameState.players);
  }, [newGameState]);

  const handleStart = () => {
    setActiveGame(newGameState);
    setSavedGames([...savedGames, newGameState]);
  };

  const onToggle = (playerToToggle: Player) => {
    let currentPlayers = newGameState.players.slice();
    //console.log(`%c CURRENTPLAYERS.length: ${currentPlayers?.length}`, "color:green");
    const index = currentPlayers.findIndex((value: Player) => value.id === playerToToggle.id);
    //if it exists, delete it. if it doesn't, add it
    if (index > -1) {
      let tempPlayers = currentPlayers.slice();
      currentPlayers = tempPlayers.splice(index, 1);
    } else {
      currentPlayers.push(playerToToggle);
    }

    setNewGameState({ ...newGameState, players: currentPlayers });
    checkContextState();
  };
  function checkContextState() {
    console.log({ newGameState }, "...checking state");
    console.table(newGameState.players);
  }

  return (
    <React.Fragment>
      <Button
        color="secondary"
        component={Link}
        onClick={handleStart}
        to={`/active/?id=${newGameState.id}`}
        variant="contained"
        endIcon={<DoubleArrowIcon fontSize="large" />}
      >
        START
      </Button>
      <div className="select-player-wrapper" style={{ display: "grid", gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
        {players.map((value: Player, index: number) => {
          return <PlayerCard onToggle={onToggle} player={value} key={`pc_${players[index].id}`} />;
        })}
        {/* <AddPlayerCard /> */}
      </div>
    </React.Fragment>
  );
};
// const AddPlayerCard: React.FC = () => {
//   return (
//     <div className="player-card-items">
//       <IconButton size="medium" aria-label="add new player">
//         <PersonAddIcon fontSize="large" />
//       </IconButton>
//       <h3 className="player-card-item">Add Player</h3>
//     </div>
//   );
// };

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
      // color: theme.palette.getContrastText(purple[400]),
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
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
    <div className="app" id="eyes">
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
