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

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(score1 = 0, score2 = 0, score3?: number) {
  return { score1, score2, score3 };
}

function createRows(players: Player[]) {
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
interface Props {
  game: Game;
}
// &nbsp; -> whitespace
const GameTable: React.FC<Props> = ({ game }) => {
  const classes = useStyles();
  const rows = createRows(game.players);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Hand</StyledTableCell>
            {game.players.map((value: Player, index: number) => {
              return (
                <StyledTableCell key={`head_cell_${value.nickname}`} align="right">
                  {game.players[index].nickname}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={`body_row_${index}`}>
              <StyledTableCell component="th" scope="row">
                #{index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.score1}</StyledTableCell>
              <StyledTableCell align="right">{row.score2}</StyledTableCell>
              <StyledTableCell align="right">{row?.score3}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default GameTable;
