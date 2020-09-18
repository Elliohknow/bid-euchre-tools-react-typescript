import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import React from "react";
import { CTX, Game, Player } from "../ContextStore";
import DialogSelect from "./DialogSelect";
import ScoreInput from "./ScoreInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      height: "100vh",
      width: "100%",
    },
    bar: {
      height: "10vh",
      placeItems: "center",
      placeContent: "center",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
    paper: {
      // alignItems: "middle",
      // alignItems: "center",
      // padding: theme.spacing(1),
      // margin: theme.spacing(1),
      height: "10vh",
      textAlign: "center",
      color: theme.palette.text.primary,
      whiteSpace: "normal",
    },
    typography: {
      paddingTop: theme.spacing(2),
      alignContent: "center",
      alignItems: "center",
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
  const [open, setOpen] = React.useState(false);
  const { activeGame, setActiveGame } = React.useContext(CTX);
  const [rows, setRows] = React.useState(createRows(activeGame.players?.length));
  React.useEffect(() => {
    console.table(rows);
    console.table(activeGame.dealers);

    return () => {};
  }, []);

  const handleOpen = () => {
    setOpen(true);
    console.log({ open });
  };
  const handleClose = (bid?: { name: string; suit: string; amount: string | number }) => {
    setOpen(false);
    console.log({ open });

    if (bid?.name && bid?.suit && bid?.amount) {
      setActiveGame((prev: Game) => {
        return {
          ...prev,
          currentBid: {
            player: prev?.players.find((player: Player) => player.nickname === bid.name),
            suit: bid.suit,
            amount: bid.amount,
          },
        };
      });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={1}>
          <Grid className={classes.bar} container item direction="row" justify="center" spacing={1} sm={12} alignContent="stretch" alignItems="stretch">
            <Grid item sm={activeGame.players?.length < 3 ? 1 : 3}>
              <Paper square className={classes.paper}>
                <Typography className={classes.typography} align="center" variant="body1">
                  Hand
                </Typography>
              </Paper>
            </Grid>
            {activeGame.players.map((value, index) => (
              <Grid key={`pn_${index}`} item sm={activeGame.players?.length < 3 ? 5 : 3}>
                <Paper square className={classes.paper} style={{ width: "100%" }}>
                  <Typography className={classes.typography} variant="body1">
                    {value.nickname}
                  </Typography>
                </Paper>
              </Grid>
            ))}
            <Grid item sm={1}>
              <Paper square className={classes.paper}>
                <Typography className={classes.typography}>
                  <Button color="secondary" onClick={handleOpen} aria-label="Set Current Bid" aria-haspopup="true" role="bid button">
                    BID
                  </Button>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {rows.map((row, index) => (
            //<GridRow key={`gr_${index}`} row={value} index={index} game={activeGame} />
            <Grid key={`ri_${index}`} className={classes.bar} container item direction="row" justify="center" spacing={1} sm={12}>
              <Grid item sm={1}>
                <Paper square className={classes.paper}>
                  <Typography className={classes.typography} align="center" variant="body1">
                    #{index + 1}
                  </Typography>
                </Paper>
              </Grid>
              {row.map((value: number | string, idx: number) => (
                <Grid key={`si_${idx}`} item sm={activeGame.players?.length < 3 ? 5 : 3}>
                  <Paper square className={classes.paper}>
                    <ScoreInput player={activeGame.players[idx]} rowIndex={index} scoreProp={value} />
                  </Paper>
                </Grid>
              ))}
              <Grid item sm={1}>
                <Paper square className={classes.paper}>
                  <Typography className={classes.typography} align="center" variant="body1">
                    END-{index + 1}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          ))}

          <Grid className={classes.bar} container item direction="row" alignContent="center" justify="center" spacing={1}>
            <Grid item sm={12}>
              <Paper square className={classes.paper}>
                <Typography className={classes.typography} align="center" variant="body1">
                  <PlusOneIcon fontSize="large" />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <DialogSelect open={open} onClose={handleClose} keepMounted id="bid-menu" />
      </Container>
    </div>
  );
};
export default GameGrid;

// function FormRow() {
//   return (
//     <React.Fragment>
//       <Grid item sm={4}>
//         <Paper square className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//       <Grid item sm={4}>
//         <Paper square className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//       <Grid item sm={4}>
//         <Paper square className={classes.paper}  className={classes.paper}>item</Paper>
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
