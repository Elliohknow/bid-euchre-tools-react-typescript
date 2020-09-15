import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import React from "react";
import { CTX } from "../ContextStore";
import { getDealerForHands } from "../utils";
import ScoreInput from "./ScoreInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
    },
    bar: {},
    paper: {
      maxHeight: "7ch",
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.primary,
      whiteSpace: "nowrap",
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  })
);

function createData(numPlayers: number) {
  if (numPlayers <= 2) {
    return ["", ""];
  } else {
    return ["", "", ""];
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

const GameGrid: React.FC = () => {
  const classes = useStyles();
  const [hand, setHand] = React.useState(1);

  const { activeGame } = React.useContext(CTX);

  const rows = createRows(activeGame.players?.length);

  React.useEffect(() => console.log(getDealerForHands(activeGame.hands, activeGame.players)));

  return (
    <div className="game">
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={1}>
          <Grid container item direction="row" justify="center" spacing={1} md={12}>
            <Grid item md={activeGame.players?.length < 3 ? 1 : 3}>
              <Paper className={classes.paper}>
                <Typography variant="body1">Hand</Typography>
              </Paper>
            </Grid>
            {activeGame.players.map((value, index) => (
              <Grid key={`pn_${index}`} item md={activeGame.players?.length < 3 ? 5 : 3}>
                <Paper className={classes.paper} style={{ width: "100%" }}>
                  <Typography variant="body1">{value.nickname}</Typography>
                </Paper>
              </Grid>
            ))}
            <Grid item md={1}>
              <Paper className={classes.paper}>END-0</Paper>
            </Grid>
          </Grid>
          {rows.map((value, index) => (
            //<GridRow key={`gr_${index}`} row={value} index={index} game={activeGame} />
            <Grid key={`ri_${index}`} container item direction="row" justify="center" spacing={1} md={12}>
              <Grid item md={1}>
                <Paper className={classes.paper}>#{index + 1}</Paper>
              </Grid>
              {value.map((value: number | string, idx: number) => (
                <Grid key={`si_${idx}`} container item md={activeGame.players?.length < 3 ? 5 : 3} alignContent="flex-start">
                  <Grid item md={2}>
                    <Paper className={classes.paper}>
                      <PersonPinCircleIcon />
                    </Paper>
                  </Grid>
                  <Grid item md={10}>
                    <Paper className={classes.paper}>
                      <ScoreInput player={activeGame.players[idx]} rowIndex={index} scoreProp={value} />
                    </Paper>
                  </Grid>
                </Grid>
              ))}
              <Grid item md={1}>
                <Paper className={classes.paper}>END-{index + 1}</Paper>
              </Grid>
            </Grid>
          ))}

          <Grid container item direction="row" justify="center" spacing={1}>
            <Grid item md={12}>
              <Paper className={classes.paper}>
                <PlusOneIcon />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* <BottomBar hand={hand} setHand={setHand} /> */}
    </div>
  );
};
export default GameGrid;

// function FormRow() {
//   return (
//     <React.Fragment>
//       <Grid item md={4}>
//         <Paper className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//       <Grid item md={4}>
//         <Paper className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//       <Grid item md={4}>
//         <Paper className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//     </React.Fragment>
//   );
// }

// const Grid: React.FC = () => {
//   const classes = useStyles();
//   const [hands, setHands] = React.useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
//   const { activeGame } = React.useContext(CTX);

//   const rows = createRows(activeGame.players?.length);

//   return (
//     <div className={classes.container}>
//       {rows.map((value, index) => (
//         //<GridRow key={`gr_${index}`} row={value} index={index} game={activeGame} />
//         <div className={classes.container}>
//           <div style={{ gridColumnEnd: "span 2" }}>#{index + 1}</div>
//           <div style={{ gridColumnEnd: `span ${activeGame.players.length === 2 ? 4 : 3}` }}>
//             {value.map((value: number, i: number) => (
//               <ScoreInput key={`si_${i}`} player={activeGame.players[i]} rowIndex={index} scoreProp={value} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const GridRow: React.FC<RowProps> = (props) => {
//   const { index, row, game } = props;

//   return (
//     <div className={classes.container} >
//       <div style={{ gridColumnEnd: "span 2" }}>#{index + 1}</div>
//       <div style={{ gridColumnEnd: `span ${game.players.length === 2 ? 4 : 3}` }}>
//         {row.map((value: number, i: number) => (
//           <ScoreInput key={`si_${i}`} player={game.players[i]} rowIndex={index} scoreProp={value} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Column = () => {}

// interface ContainerProps {
//   children: any;
// }
// const GameContainer: React.FC<ContainerProps> = (props) => (
//   <React.Fragment>
//   <CssBaseline />
//   <Container maxWidth="md" style={{ height: "100vh" }}>
//     {props.children}
//   </Container>
//   </React.Fragment>
// );
// interface RowProps {
//   index: number;
//   row: any;
//   game: Game;
//   // incrementHand: any;
// }
