import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import { useContext, useEffect, useMemo, useState } from 'react'
import { CTX, Game, Player } from '../ContextStore'
import { createData } from '../utils'
import DialogSelect from './DialogSelect'
import ScoreInput from './ScoreInput'
// import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      position: 'relative',
      height: '100vh',
    },
    container: {
      width: '100%',
    },
    bar: {
      // height: "10vh",
      // placeItems: "center",
      // placeContent: "center",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
    paper: {
      placeContent: 'center',
      placeItems: 'center',
      // padding: theme.spacing(1),
      // margin: theme.spacing(1),
      // height: "10vh",
      width: '100%',
      textAlign: 'center',
      color: theme.palette.text.primary,
      whiteSpace: 'normal',
    },
    typography: {
      paddingTop: theme.spacing(2),
      alignContent: 'center',
      alignItems: 'center',
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  })
)

const GameTable: React.FC = () => {
  const classes = useStyles()
  const { activeGame, setActiveGame } = useContext(CTX)
  const len = activeGame.players.length
  const memoizedData = useMemo(() => createData(len), [createData])
  const [data, setData] = useState(memoizedData)
  const [open, setOpen] = useState<boolean>(false)
  const [bidRow, setBidRow] = useState<number | null>(0)

  useEffect(() => {
    // let a = 0 ?? null
    setActiveGame((prev: Game) => {
      return {
        ...prev,
        data,
      }
    })
  }, [setActiveGame, data])

  const handleOpen = (rowNum: number): void => {
    setOpen(true)
    setBidRow(rowNum)
  }
  const handleClose = (bid?: { name: string; suit: string; amount: string | number; row: number }) => {
    setOpen(false)
    if (!bid) {
      setBidRow(null)
    }
    console.log('bid: ', bid)
    if (bid?.name && bid?.suit && bid?.amount && bid?.row) {
      setActiveGame((prev: Game) => {
        return {
          ...prev,
          // bids: [...prev?.bids, bid],
          bids: [...prev?.bids, bid],
          // prev?.bids ? prev?.bids.map((value:any, index:number) => {
          //   return index === bid.row ? {...value, name: bid.name, suit: bid.suit, amount: bid.amount, } : value;
          // }) : [bid],
          currentBid: {
            player: prev.players.find((player: Player) => player.nickname === bid.name),
            suit: bid.suit,
            amount: bid.amount,
            row: bid.row,
          },
        }
      })
    }
    console.log(activeGame.bids)
  }
  const updateScore = (rowIndex: number, colIndex: number, scoreValue: number | string) => {
    let tempData = data.slice()
    let newData = tempData.map((value, index) => {
      // console.log(`value: ${value}, index: ${index}`);
      return tempData[index] !== tempData[rowIndex]
        ? value
        : value.map((val, idx) => {
            console.log(`value[idx]: ${value[idx]}, val: ${val}, idx: ${idx}`)
            return idx !== colIndex ? val : String(scoreValue)
          })
    })
    console.log(`score changed in row-${rowIndex}, column-${colIndex}, score: ${scoreValue}`)
    // console.table(newData)
    setData(newData)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="xs" className={classes.container}>
        <Grid container spacing={1}>
          <Grid
            className={classes.bar}
            container
            item
            direction="row"
            justify="center"
            spacing={1}
            xs={12}
            alignContent="stretch"
            alignItems="stretch"
          >
            <Grid item xs={activeGame.players?.length < 3 ? 1 : 2}>
              <Paper square className={classes.paper}>
                <Typography className={classes.typography} align="center" variant="body1">
                  Hand
                </Typography>
              </Paper>
            </Grid>
            {activeGame.players.map((value, index) => (
              <Grid key={`pn_${index}`} item xs={activeGame.players?.length < 3 ? 5 : 3}>
                <Paper square className={classes.paper} style={{ width: '100%' }}>
                  <Typography className={classes.typography} variant="body1">
                    {value.nickname}
                  </Typography>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={1}>
              <Paper square className={classes.paper}>
                <Typography className={classes.typography}>BID</Typography>
              </Paper>
            </Grid>
          </Grid>
          {data.map((row, index) => (
            //<GridRow key={`gr_${index}`} row={value} index={index} game={activeGame} />
            <Grid
              key={`ri_${index}`}
              style={{ cursor: 'pointer' }}
              className={classes.bar}
              container
              item
              direction="row"
              justify="center"
              spacing={1}
              xs={12}
            >
              <Grid item xs={1}>
                <Paper square className={classes.paper}>
                  <Typography className={classes.typography} align="center" variant="body1">
                    #{index + 1}
                  </Typography>
                </Paper>
              </Grid>
              {row.map((value: number | string, idx: number) => (
                <Grid key={`si_${idx}`} item xs={activeGame.players?.length < 3 ? 5 : 3}>
                  <Paper square className={classes.paper}>
                    <ScoreInput
                      playerName={activeGame.players[idx]?.nickname}
                      rowIndex={index + 1}
                      colIndex={idx}
                      scoreProp={value}
                      updateScore={updateScore}
                    />
                  </Paper>
                </Grid>
              ))}
              <Grid item xs={1}>
                <Paper square className={classes.paper}>
                  {/* <Typography className={classes.typography} align="center" variant="body1"> */}
                  <Button
                    color="secondary"
                    onClick={() => handleOpen(index)}
                    aria-label="Set Current Bid"
                    aria-haspopup="true"
                    role="bid button"
                  >
                    BID {index + 1}
                  </Button>
                  {/* BID  </Typography> */}
                </Paper>
              </Grid>
            </Grid>
          ))}

          <Grid
            className={classes.bar}
            container
            item
            direction="row"
            alignContent="stretch"
            justify="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <Paper square className={classes.paper}>
                <Typography className={classes.typography} align="center" variant="body1">
                  <PlusOneIcon fontSize="large" />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <DialogSelect
          open={open}
          onClose={handleClose}
          bidRow={bidRow}
          // keepMounted
          id="bid-menu"
        />
      </Container>
    </div>
  )
}
export default GameTable

// function FormRow() {
//   return (
//     <React.Fragment>
//       <Grid item xs={4}>
//         <Paper square className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//       <Grid item xs={4}>
//         <Paper square className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//       <Grid item xs={4}>
//         <Paper square className={classes.paper}  className={classes.paper}>item</Paper>
//       </Grid>
//     </React.Fragment>
//   );
// }

// const Grid: React.FC = () => {
//   const classes = useStyles();
//   const [hands, setHands] = React.useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
//   const { activeGame } = React.useContext(CTX);

//   const data = createdata(activeGame.players?.length);

//   return (
//     <div className={classes.container}>
//       {data.map((value, index) => (
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
//   <Container maxWidth="xs" style={{ height: "100vh" }}>
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
