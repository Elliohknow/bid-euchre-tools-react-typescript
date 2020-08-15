import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { CTX, Game, Player } from "../ContextStore";
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
function createData(scores: any[]) {
  return scores.reduce((acc: object, current: number, index: number) => {
    return { ...acc, [index]: current };
  }, {});
}
// function createColumns() {}
function createRows(scores: any[]) {
  // let scoreIterator;
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
interface RowProps {
  index: number;
  row: any;
  g: Game;
}
const Row: React.FC<RowProps> = ({ index, row, g }) => (
  <TableRow className={`${g.currentHand === index + 1 && "current-turn"}`}>
    <TableCell component="th" scope="row">
      #{index + 1}
    </TableCell>
    {g.players.map((value: Player, i: number) => (
      <TableCell key={`tc_${value.nickname}_${row}`} align="center" className={`${g.currentDealer === value.nickname && "dealer-indicator"}`}>
        {g.currentHand < index + 1 ? "-" : value.currentScore}
      </TableCell>
    ))}
  </TableRow>
);
// &nbsp; -> whitespace
const GameTable: React.FC = () => {
  const { activeGame, setActiveGame } = React.useContext(CTX);
  // const [dealer, setDealer] = React.useState(() => {
  //   let d = "";
  //   if ("currentDealer" in activeGame === false) {
  //     setActiveGame({...activeGame, currentDealer: })
  //   }
  //   return activeGame.players[getRandomInitialDealer(activeGame.players.length)].nickname;
  // });
  // const [bidTaker, setBidTaker] = React.useState();
  const [currentScores, setCurrentScores] = React.useState(() => {
    let scores = new Array(activeGame?.players.length);

    activeGame.players.map((player: Player, i: number) => {
      if ("currentScore" in player === false) {
        scores[i] = 0;
        setActiveGame({
          ...activeGame,
          players: [
            ...activeGame.players,
            {
              ...player,
              currentScore: 0,
            },
          ],
        });
      } else {
        scores[i] = player.currentScore;
      }
    });
    return scores;
  });
  // const [rows] = React.useState(createRows(currentScores));
  const rows = createRows(currentScores);
  const classes = useStyles();

  const checkTableState = (state: any) => {
    console.log({ state }, "...checking Table state");
    // console.table(newGameState.players);
  };

  React.useEffect(() => {
    let initialHand: number = activeGame?.currentHand || 1;

    setActiveGame({ ...activeGame, currentHand: initialHand });

    checkTableState(activeGame);
  });

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table /*className={classes.table}*/ aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Hand</TableCell>
            {activeGame.players.map((value: Player, index: number) => {
              return (
                <TableCell key={`hc_${index}`} align="center">
                  {activeGame.currentDealer === value.nickname && activeGame.currentHand === index + 1 ? (
                    <IconButton aria-label="current dealer" disabled color="primary">
                      <PersonIcon className="dealer-icon"></PersonIcon>
                    </IconButton>
                  ) : (
                    <IconButton aria-label="player" color="default">
                      <PersonIcon className="dealer-icon"></PersonIcon>
                    </IconButton>
                  )}
                  {value.nickname}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row index={index} row={row} g={activeGame} key={`tr_${index}`} />
            // <TableRow key={`body_row_${index}`} className={`${activeGame.currentHand === index + 1 && "current-turn"}`}>
            //   <TableCell component="th" scope="row">
            //     #{index + 1}
            //   </TableCell>
            //   {activeGame.players.map((value: Player, i: number) => {
            //     return (
            //       <TableCell key={`${value.nickname}_r${index}_p${i + 1}`} align="center">
            //         {activeGame.currentHand < index + 1 ? "-" : value.currentScore}
            //       </TableCell>
            //     );
            //   })}
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default GameTable;
