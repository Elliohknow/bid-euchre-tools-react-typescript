import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import React from "react";
import { Game, Player } from "../ContextStore";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
  },
  table: {
    minWidth: 600,
  },
});
// function createData(score1 = 0, score2 = 0, score3?: number) {
//   return { score1, score2, score3 };
// }
function createData(scores: any[]) {
  return scores.reduce((acc: object, current: number, index: number) => {
    return { ...acc, [index]: current };
  }, {});
}
// function createColumns() {}
function createRows(scores: any[]) {
  let scoreIterator;
  return [
    createData(scores),
    createData(scores),
    createData(scores),
    createData(scores),
    createData(scores),
    createData(scores),
    createData(scores),
    createData(scores),
  ];
}
// function getScores() {}

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
    let scores = new Array(activeGame.players.length);

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
  const rows = createRows(currentScores);

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
            <TableRow key={`body_row_${index}`} className={`${turn === index + 1 && "current-turn"}`}>
              <TableCell component="th" scope="row">
                #{index + 1}
              </TableCell>
              {activeGame.players.map((value: Player, i: number) => {
                return (
                  <TableCell key={`${value.nickname}_r${index}_p${i + 1}`} align="center">
                    {dealer === value && <RecentActorsIcon className="dealer-icon"></RecentActorsIcon>}
                    {turn < index + 1 ? "-" : currentScores[i]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default GameTable;
