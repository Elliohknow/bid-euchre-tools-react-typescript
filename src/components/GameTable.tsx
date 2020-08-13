import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { Game, Player } from "../ContextStore";

// const TableCell = withStyles((theme: Theme) =>
//   createStyles({
//     head: {
//       backgroundColor: "var(--radgrad)",
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   })
// )(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    current: {
      backgroundColor: theme.palette.secondary.main,
    },
  })
)(TableRow);

// function createData(score1 = 0, score2 = 0, score3?: number) {
//   return { score1, score2, score3 };
// }
function createData(scores: any[]) {
  return scores.reduce((acc: object, current: number, index: number) => {
    return { ...acc, [index]: current };
  }, {});
}
// function createColumns() {}
function createRows(players: Player[]) {
  let scoreIterator;
  return [
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
    createData(players[0]?.currentScore, players[1]?.currentScore), //, players[2]?.currentScore),
  ];
}
function getScores() {}
const useStyles = makeStyles({
  root: {
    justifyContent: "center",
  },
  table: {
    minWidth: 600,
  },
});
const initialDealer = (max: number) => {
  return Math.floor(Math.random() * max);
};
interface Props {
  activeGame: Game;
  setActiveGame: (v: any) => void;
}
// &nbsp; -> whitespace
const GameTable: React.FC<Props> = ({ activeGame, setActiveGame }) => {
  const [dealer, setDealer] = React.useState(activeGame.players[initialDealer(activeGame.players.length - 1)]);
  const [turn, setTurn] = React.useState(1);
  const [bidTaker, setBidTaker] = React.useState();
  const [currentScores, setCurrentScores] = React.useState(() => {
    // for (let i = 0; i < activeGame.players.length; i++) {
    // scores = { ...scores, [activeGame.players[i].nickname]: activeGame.players[i]?.currentScore || 0 };
    // }
    // return scores;
    let scores = new Array(activeGame.players.length);
    // let scores:any[] = [];
    activeGame.players.forEach((player: Player, i: number) => {
      if ("currentScore" in player === false) {
        scores[i] = 0;
      } else {
        scores[i] = player.currentScore;
      }
    });
    return scores;
  });
  const classes = useStyles();
  const rows = createRows(activeGame.players);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Hand</TableCell>
            {activeGame.players.map((value: Player, index: number) => {
              return (
                <TableCell key={`head_cell_${value.nickname}`} align="center">
                  {activeGame.players[index].nickname}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={`body_row_${index}`}>
              <TableCell component="th" scope="row">
                #{index + 1}
              </TableCell>
              {activeGame.players.map((value: Player, i: number) => {
                return (
                  <TableCell key={`${value.nickname}_r${index}_p${i + 1}`} align="center">
                    {turn < index + 1 ? "-" : currentScores[i]}
                  </TableCell>
                );
              })}
              {/* <TableCell align="center">{row.score2}</TableCell>
              <TableCell align="center">{row?.score3}</TableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default GameTable;
