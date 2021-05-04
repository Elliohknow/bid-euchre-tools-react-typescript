import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import React from 'react'
import { CTX, scoreOptions } from '../ContextStore'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '100%',
      // height: "calc(10vh - 5px)",
      placeItems: 'stretch',
      placeContent: 'stretch',
      // paddingTop: theme.spacing(1),
    },
  })
)

interface Props {
  playerName: string
  rowIndex: number
  colIndex: number
  scoreProp: string | number
  updateScore: (r: number, c: number, v:number|string) => void
}

const ScoreInput: React.FC<Props> = ({ playerName, rowIndex, colIndex, scoreProp, updateScore }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState<string | number>(scoreProp)
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const { activeGame } = React.useContext(CTX)
  const dealing = activeGame.dealers[rowIndex] === playerName

  const onChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    let changed = Number(event.target.value)
    if (changed !== Number(value)) {
      setValue(changed)
      updateScore(rowIndex, colIndex, changed)
    }
    // setValue(Number(event.target.value))
  }

  // const onBlur = (): void => {
  //   updateScore({ rowIndex, colIndex, value })
  // }

  return (
    // <div className={classes.root}>
    // <form noValidate autoComplete="off" className={classes.form}>
    <FormControl variant="filled" className={classes.root}>
      <TextField
        select
        // id="select"
        label="score"
        variant="filled"
        value={value}
        onChange={onChange}
        // onBlur={onBlur}
        color="primary"
        SelectProps={{
          startAdornment: dealing && (
            <InputAdornment position="start">
              <PersonPinCircleIcon className="dealer-icon" />
            </InputAdornment>
          ),
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {scoreOptions.map((option, idx) => (
          <MenuItem key={`mi_${option.value}_${idx}`} value={option.value}>
            {option.value < 12 ? option.label : <em>{option.label}</em>}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
    // </form>
    // </div>
  )
}
export default ScoreInput

// React.useEffect(() => {
//   let index = activeGame.players.indexOf(player);

//   if (index === -1) {
//     console.log(`Error: the player at index (${index}) does not exist in activeGame.players`);
//     return;
//   }

//   if (activeGame?.currentBid?.player?.id === player.id && score < activeGame?.currentBid?.amount) {
//     console.log(player.nickname, score);
//     //   setActiveGame((prev: Game) => {
//     //     return {
//     //       ...prev,
//     //       players: [
//     //         ...prev.players,
//     //         {
//     //           ...prev.players[index],
//     //           currentScore: player?.currentScore - Number(score),
//     //           // TODO fix the below functionality, should edit the hand value at an explicit array index/object key
//     //           hands: [...player?.hands, [prev.currentHand, 0 - Number(score)]],
//     //         },
//     //       ],
//     //     };
//     //   });
//     // } else {
//     //   setActiveGame((prev: Game) => {
//     //     return {
//     //       ...prev,
//     //       players: [
//     //         ...prev.players,
//     //         {
//     //           ...prev.players[index],
//     //           currentScore: player?.currentScore + Number(score),
//     //           // TODO fix the below functionality, should edit the hand value at an explicit array index/object key
//     //           hands: [...player?.hands, [prev.currentHand, Number(score)]],
//     //           // currentScore: (player?.currentScore ? player.currentScore + Number(score) : 0 + Number(score)),
//     //         },
//     //       ],
//     //     };
//     //   });
//   }
// }, [score]);
