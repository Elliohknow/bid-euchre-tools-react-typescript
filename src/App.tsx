import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import BasicAppBar from "./components/BasicAppBar";
import GameCard from "./components/GameCard";
import PlayerCard from "./components/PlayerCard";
import GameGrid from "./components/TableGrid";
import { CTX, defaultActiveGame, Game, Player } from "./ContextStore";
import {
  getDateTimeElements,
  getDealersForHands,
  getRandomInitialDealer,
} from "./utils";
// import GameTable from "./components/Table";
// import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined";
// import RecentActorsIcon from "@material-ui/icons/RecentActors";

const ActiveGame: React.FC = () => {
  const { activeGame } = React.useContext(CTX);
  const numDummies =
    activeGame?.players.length <= 3 ? 4 - activeGame?.players.length : 0;
  const { day, date, time } = getDateTimeElements(activeGame?.dateTime);

  return (
    <div className="game">
      <p> game.id :{activeGame?.id}</p>
      <div className="date">
        Started on {day}, {date} at {time}
      </div>
      <div className="numPlayers">
        number of players: {activeGame?.players.length}
      </div>
      <div className="numDummies">number of dummy players: {numDummies}</div>
      {/* <GameTable /> */}
      <GameGrid />
    </div>
  );
};

const useNewGameStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      margin: "2rem 0 1rem 0",
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  })
);
const NewGameSetup: React.FC = () => {
  const classes = useNewGameStyles();
  const {
    setActiveGame,
    savedGames,
    setSavedGames,
    players,
  } = React.useContext(CTX);
  const [newGameState, setNewGameState] = React.useState<Game>(
    defaultActiveGame
  );
  // const [newGameState, setNewGameState] = React.useState<Game>({
  //   id: UUID(),
  //   dateTime: formatDateTime(),
  //   players: players,
  //   winner: null,
  //   numHands: 8,
  //   hands: [1, 2, 3, 4, 5, 6, 7, 8],
  //   dealers: ,
  //   currentHand: 1,
  //   currentDealer: getRandomInitialDealer(players.length),
  // });

  const handleStart = () => {
    setActiveGame(newGameState);
    setSavedGames([...savedGames, newGameState]);
  };

  const onToggle = (playerToToggle: Player) => {
    let currentPlayers = newGameState.players.slice();
    // check for the player in the new game's players list
    const index = currentPlayers.findIndex(
      (value: Player) => value.id === playerToToggle.id
    );
    // if it exists there, delete it
    if (index > -1) {
      currentPlayers.splice(index, 1);
    }
    // if it doesn't exist there, add it
    if (index === -1) {
      currentPlayers.push(playerToToggle);
    }
    setNewGameState((prev: Game) => {
      let startingIndex = getRandomInitialDealer(currentPlayers.length);
      return {
        ...prev,
        players: currentPlayers,
        currentDealer: startingIndex,
        dealers: getDealersForHands(prev.hands, currentPlayers, startingIndex),
      };
    });

    // console.table(newGameState.players);
    console.table(currentPlayers);
    // console.table(newGameState.dealers);
  };

  return (
    <React.Fragment>
      <Button
        className={classes.root}
        color="secondary"
        component={Link}
        onClick={handleStart}
        to={`/active/?id=${newGameState.id}`}
        variant="contained"
        endIcon={<DoubleArrowIcon fontSize="large" />}
        style={{ marginTop: "1rem" }}
      >
        START
      </Button>
      <div className="select-player-wrapper">
        {players.map((value: Player, index: number) => {
          return (
            <PlayerCard
              onToggle={onToggle}
              player={value}
              key={`pc_${players[index].id}`}
            />
          );
        })}
        {/* <AddPlayerCard /> */}
      </div>
    </React.Fragment>
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
      backgroundColor: theme.palette.secondary.main,
      color: "#ffffff",
      margin: "2rem 0 2rem 0",
      fontSize: "2rem",
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
      <Button
        component={Link}
        size="large"
        className={classes.root}
        to="/newgame"
        color="primary"
        variant="contained"
      >
        NEW GAME
      </Button>
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
