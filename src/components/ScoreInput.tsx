import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { CTX, Player, scoreOptions } from "../ContextStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        minWidth: "10ch",
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "8ch",
    },
  })
);

interface Props {
  player: Player;
  rowIndex: number;
}

const ScoreInput: React.FC<Props> = ({ player, rowIndex }) => {
  const classes = useStyles();
  const [score, setScore] = React.useState<string | number>("");
  const { activeGame, setActiveGame } = React.useContext(CTX);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setScore(Number(event.target.value));
  };

  React.useEffect(() => {
    let index = activeGame.players.indexOf(player);

    if (index === -1) {
      console.log(`Error: the player at index (${index}) does not exist in activeGame.players`);
      return;
    }

    if (activeGame?.currentBid?.player?.id === player.id && score < activeGame?.currentBid?.amount) {
      console.log(player.nickname, score);
      //   setActiveGame((prev: Game) => {
      //     return {
      //       ...prev,
      //       players: [
      //         ...prev.players,
      //         {
      //           ...prev.players[index],
      //           currentScore: player?.currentScore - Number(score),
      //           // TODO fix the below functionality, should edit the hand value at an explicit array index/object key
      //           hands: [...player?.hands, [prev.currentHand, 0 - Number(score)]],
      //         },
      //       ],
      //     };
      //   });
      // } else {
      //   setActiveGame((prev: Game) => {
      //     return {
      //       ...prev,
      //       players: [
      //         ...prev.players,
      //         {
      //           ...prev.players[index],
      //           currentScore: player?.currentScore + Number(score),
      //           // TODO fix the below functionality, should edit the hand value at an explicit array index/object key
      //           hands: [...player?.hands, [prev.currentHand, Number(score)]],
      //           // currentScore: (player?.currentScore ? player.currentScore + Number(score) : 0 + Number(score)),
      //         },
      //       ],
      //     };
      //   });
    }
  }, [score]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        {activeGame?.currentBid && activeGame?.currentBid?.player?.id === player?.id && activeGame.currentHand === rowIndex + 1 && (
          <Avatar className={classes.small}>
            {activeGame?.currentBid?.call
              ? `C${activeGame?.currentBid?.callAmount}`
              : `${activeGame?.currentBid?.amount}${activeGame?.currentBid?.suit?.label}`}
          </Avatar>
        )}
        <TextField
          select
          value={score}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          color="primary"
          size="small"
          // label={"hand" || ""}
          disabled={activeGame.currentHand !== rowIndex + 1}
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
    </form>
  );
};
export default ScoreInput;
