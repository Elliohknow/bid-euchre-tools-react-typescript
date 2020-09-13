import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { CTX, Game } from "../ContextStore";
import BottomBar from "./BottomBar";
import ScoreInput from "./ScoreInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: theme.spacing(1),
    },
    hand: {
      gridColumnEnd: "span 1",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  })
);

function createData(numPlayers: number) {
  if (numPlayers <= 2) {
    return [0, 0];
  } else {
    return [0, 0, 0];
  }
}

function createRows(numPlayers: number) {
  // let scoreIterator;
  return [
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
  ];
}

interface ContainerProps {
  children: any;
}
const GameContainer: React.FC<ContainerProps> = (props) => (
  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md" style={{ height: "100vh" }}>
      {props.children}
    </Container>
  </React.Fragment>
);
interface RowProps {
  index: number;
  row: any;
  game: Game;
  // incrementHand: any;
}
const GridRow: React.FC<RowProps> = (props) => {
  const { index, row, game } = props;

  return (
    <div className={`${game.currentHand === index + 1 && "current-turn"}`}>
      <div style={{ gridColumnEnd: "span 2" }}>#{index + 1}</div>
      <div style={{ gridColumnEnd: `span ${game.players.length === 2 ? 4 : 3}` }}>
        {row.map((value: number, i: number) => {
          <ScoreInput player={game.players[i]} rowIndex={index} scoreProp={value} />;
        })}
      </div>
      <div style={{ gridColumnEnd: -1 }}></div>
    </div>
  );
};

// const Column = () => {}

const Grid: React.FC = () => {
  const classes = useStyles();
  const [hands, setHands] = React.useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const { activeGame } = React.useContext(CTX);

  const rows = createRows(activeGame.players?.length);

  return (
    <div className={classes.container}>
      {rows.map((value, index) => {
        <GridRow row={value} index={index} game={activeGame} />;
      })}
    </div>
  );
};

const GameGrid: React.FC = () => {
  const [hand, setHand] = React.useState(1);

  return (
    <div className="game">
      <GameContainer>
        <Grid />
      </GameContainer>
      <BottomBar hand={hand} setHand={setHand} />
    </div>
  );
};
export default GameGrid;
