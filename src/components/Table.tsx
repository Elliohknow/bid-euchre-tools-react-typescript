import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { CTX, Game, Player } from "../ContextStore";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
const useStyles = makeStyles({
  root: {
    justifyContent: "center",
    minWidth: 600,
    maxWidth: 900,
    padding: 8,
    margin: 10,
  },
  // table: {
  // },
});
// function createData(score1 = 0, score2 = 0, score3?: number) {

//   return { score1, score2, score3 };
// }
// function createCols(players: Player[]) {
//   players.forEach((value: Player, index: number) => {
//     cols.push({ title: value.nickname, field: `score${index + 1}`, type: "numeric" });
//   });
//   return cols;
// }
function createData(numPlayers: number) {
  if (numPlayers <= 2) {
    return { score1: 0, score2: 0 };
  } else {
    return { score1: 0, score2: 0, score3: 0 };
  }
}
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
  g: Game;
}
const CustomRow: React.FC<RowProps> = ({ index, row, g }) => (
  <TableRow className={`${g.currentHand === index + 1 && "current-turn"}`}>
    <TableCell component="th" scope="row">
      #{index + 1}
    </TableCell>
    {g.players.map((value: Player, i: number) => (
      <TableCell key={`tc_${value.nickname}_${row}`} align="center" className={`${g.currentDealer === i && "dealer-indicator"}`}>
        {g.currentHand < index + 1 ? "-" : value.currentScore}
      </TableCell>
    ))}
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

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table /*className={classes.table}*/ aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Hand</TableCell>
            {activeGame.players.map((value: Player, index: number) => {
              return (
                <TableCell key={`hc_${index}`} align="center">
                  {activeGame.currentDealer === index ? (
                    <IconButton aria-label="current dealer" disabled color="primary">
                      <PersonIcon className="dealer-icon"></PersonIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="player"
                      color="default"
                      onClick={(e) => {
                        e.preventDefault();
                        changeDealer(index);
                      }}
                    >
                      <PersonIcon className="dealer-icon"></PersonIcon>
                    </IconButton>
                  )}
                  {value.nickname}
                </TableCell>
              );
            })}
            <TableCell>Next</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <CustomRow index={index} row={row} g={activeGame} key={`tr_${index}`} />
          ))}
          <TableRow>
            <TableCell>TOTALS</TableCell>
            {activeGame.players.map((value: Player, index: number) => {
              <TableCell>{value.currentScore}</TableCell>;
            })}
            <TableCell>
              <IconButton aria-label="go to next hand" onClick={incrementHand}>
                <ArrowDownwardIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
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
