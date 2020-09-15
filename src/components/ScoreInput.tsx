import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { CTX, Player, scoreOptions } from "../ContextStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "100%",
    },
    form: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        //     minWidth: "8ch",
        //     minHeight: 0,
        //     maxHeight: 15,
      },
      //   "& .MuiSelect-selectMenu": {
      //     minHeight: 0,
      //     maxHeight: 15,
      //   },
    },
    // small: {
    //   width: theme.spacing(3),
    //   height: theme.spacing(3),
    // },
    // formControl: {
    //   minWidth: "8ch",
    // },
  })
);

interface Props {
  player: Player;
  rowIndex: number;
  scoreProp: string | number;
}

const ScoreInput: React.FC<Props> = ({ player, rowIndex, scoreProp }) => {
  const classes = useStyles();
  const [score, setScore] = React.useState<string | number>(scoreProp);
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const { activeGame } = React.useContext(CTX);

  // React.useEffect(() => {
  //   if (inputRef.current == null) {

  //   }
  // })
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setScore(Number(event.target.value));

    if (activeGame.currentBid?.player?.id === player.id && score < activeGame?.currentBid?.amount) {
      console.log(player.nickname, score);
    }
    console.log(player.nickname, score);
  };

  return (
    // <div className={classes.root}>
    <form noValidate autoComplete="off" className={classes.form}>
      <FormControl variant="filled" className={classes.root}>
        <InputLabel id="score-input-label">Score</InputLabel>
        <Select labelId="score-input-label" variant="filled" value={score} onChange={handleChange} color="primary" input={<Input />}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {scoreOptions.map((option, idx) => (
            <MenuItem key={`mi_${option.value}_${idx}`} value={option.value}>
              {option.value < 12 ? option.label : <em>{option.label}</em>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
    // </div>
  );
};
export default ScoreInput;

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
