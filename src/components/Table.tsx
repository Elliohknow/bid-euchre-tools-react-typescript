import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { CTX, Game, Player } from "../ContextStore";
import BottomBar from "./BottomBar";
import ScoreInput from "./ScoreInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      overflowX: "hidden",
      width: "calc(100% - 46px)", //changed recently
      padding: 8,
      marginTop: 10,
      marginRight: 15,
      marginBottom: 10,
      marginLeft: 15,
      backgroundColor: "transparent",
      // border: "solid var(--pdark) 3px",
      "& > *": {
        backgroundColor: theme.palette.background.default,
      },
    },
  })
);

function createData(numPlayers: number) {
  if (numPlayers <= 2) {
    return { score1: 0, score2: 0 };
  } else {
    return { score1: 0, score2: 0, score3: 0 };
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
// function getScores() {}
interface RowProps {
  index: number;
  row: any;
  game: Game;
  // incrementHand: any;
}
const CustomRow: React.FC<RowProps> = ({ index, row, game }) => (
  <TableRow className={`${game.currentHand === index + 1 && "current-turn"}`}>
    <TableCell component="th" scope="row">
      #{index + 1}
    </TableCell>
    {game.players.map((player: Player, i: number) => (
      <TableCell key={`tc_${player.nickname}_${row}`} align="center" className={`${game.currentDealer === i && "dealer-indicator"}`}>
        <ScoreInput player={player} rowIndex={index} />
      </TableCell>
    ))}
    {/* <TableCell>
      <IconButton aria-label="go to next hand" onClick={incrementHand}>
        <ArrowDownwardIcon />
      </IconButton>
    </TableCell> */}
  </TableRow>
);
// &nbsp; -> whitespace

const GameTable: React.FC = () => {
  const classes = useStyles();
  const { activeGame, setActiveGame } = React.useContext(CTX);
  // const [state, dispatch] = React.useReducer(reducer, activeGame);

  const rows = createRows(activeGame.players.length);

  const incrementHand = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let cHand = activeGame.currentHand + 1;
    //TODO: add score-based check on hand count
    let cDealer = activeGame.currentDealer + 1;
    if (cDealer > activeGame.players.length - 1) {
      cDealer = 0;
    }

    setActiveGame({ ...activeGame, currentHand: cHand, currentDealer: cDealer });
  };
  const changeDealer = (playerIndex: number) => {
    setActiveGame({ ...activeGame, currentDealer: playerIndex });
  };
  const handleChangeScore = (score: number | string) => {
    // setActiveGame()
    console.log({ score });
  };

  return (
    <div>
      <TableContainer className={classes.root} component={Paper}>
        <Table aria-label="customized table for tracking games">
          <TableHead>
            <TableRow>
              <TableCell align="center">Hand</TableCell>
              {activeGame.players.map((value: Player, index: number) => {
                return (
                  <TableCell key={`hc_${index}`} align="center">
                    {activeGame.currentDealer === index ? (
                      <IconButton aria-label="current dealer" disabled color="secondary">
                        <Avatar color="secondary" className="dealer-icon">
                          D
                        </Avatar>
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="set this player to dealer"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          changeDealer(index);
                        }}
                      >
                        <Avatar color="primary" className="not-dealer-icon"></Avatar>
                      </IconButton>
                    )}
                    {value.nickname}
                  </TableCell>
                );
              })}
              {/* <TableCell>Next</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <CustomRow key={`tr_${index}`} index={index} row={row} game={activeGame} />
            ))}
            <TableRow>
              <TableCell>TOTALS</TableCell>
              {activeGame.players.map((value: Player, index: number) => (
                <TableCell key={`totals_${index}`}>{value?.currentScore}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <BottomBar />
    </div>
  );
};
export default GameTable;

// function reducer(state: Game, action: { type: any }) {
//   switch (action.type) {
//     case "next-hand":
//       return {
//         ...state,
//         currentHand: state.currentHand + 1,
//       };
//     case "pick-new-dealer":
//       return {
//         ...state,
//         currentDealer:
//       };

//     default:
//       return state;
//   }
// }

// const [currentScores, setCurrentScores] = React.useState(() => {
//   let scores = new Array(activeGame?.players.length);

//   activeGame.players.map((player: Player, i: number) => {
//     if ("currentScore" in player === false) {
//       scores[i] = 0;
//       setActiveGame({
//         ...activeGame,
//         players: [
//           ...activeGame.players,
//           {
//             ...player,
//             currentScore: 0,
//           },
//         ],
//       });
//     } else {
//       scores[i] = player.currentScore;
//     }
//   });
//   return scores;
// });
// const [rows] = React.useState(createRows(currentScores));

// function createData(score1 = 0, score2 = 0, score3?: number) {

//   return { score1, score2, score3 };
// }
// function createCols(players: Player[]) {
//   players.forEach((value: Player, index: number) => {
//     cols.push({ title: value.nickname, field: `score${index + 1}`, type: "numeric" });
//   });
//   return cols;
// }
// function createData(scores: any[]) {
//   let cScores = {};
//   if (!scores) return;
//   if (scores?.length === 2) {
//     cScores = { scoreOne: scores[0], scoreTwo: scores[1] };
//     console.log({ cScores });
//     console.table(cScores);
//     return cScores;
//   } else if (scores?.length === 3) {
//     cScores = { scoreOne: scores[0], scoreTwo: scores[1], scoreThree: scores[2] };
//     console.log({ cScores });
//     console.table(cScores);
//     return cScores;
//   } else {
//     cScores = scores.reduce((acc: object, current: number, index: number) => {
//       return { ...acc, [index]: current };
//     }, {});
//   }
//   console.log({ cScores });
//   console.table(cScores);
//   return cScores;
// }
