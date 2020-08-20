import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { CTX, Player } from "../ContextStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formControl: {
      // display: "none",
    },
  })
);
const scoreOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 12, label: "Call for 2" },
  { value: 18, label: "Call for 1" },
  { value: 24, label: "Shoot the Moon" },
];

interface Props {
  player: Player;
  rowIndex: number;
}

const ScoreInput: React.FC<Props> = ({ player, rowIndex }) => {
  const classes = useStyles();
  const [score, setScore] = React.useState<string | number>("0");
  const { activeGame, setActiveGame } = React.useContext(CTX);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setScore(event.target.value as number);
  };

  React.useEffect(() => {
    let index = activeGame.players.indexOf(player);

    if (index < 0) {
      console.log(`Error: the player at index (${index}) does not exist in activeGame.players`);
      return;
    }

    if (activeGame?.currentBid?.player.id === player.id && score < activeGame?.currentBid?.amount) {
      setActiveGame({
        ...activeGame,
        players: [
          ...activeGame.players,
          {
            ...activeGame.players[index],
            currentScore: player?.currentScore - Number(score),
            // TODO fix the below functionality, should edit the hand value at an explicit array index/object key
            hands: [...player?.hands, [activeGame.currentHand, 0 - Number(score)]],
          },
        ],
      });
    } else {
      setActiveGame({
        ...activeGame,
        players: [
          ...activeGame.players,
          {
            ...activeGame.players[index],
            currentScore: player?.currentScore + Number(score),
            // TODO fix the below functionality, should edit the hand value at an explicit array index/object key
            hands: [...player?.hands, [activeGame.currentHand, Number(score)]],
            // currentScore: (player?.currentScore ? player.currentScore + Number(score) : 0 + Number(score)),
          },
        ],
      });
    }
  }, [score]);

  const bid = activeGame?.currentBid;
  const callHand = bid?.call;
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        {activeGame?.currentBid?.player?.id === player?.id && (
          <Avatar>{callHand ? `C${activeGame?.currentBid?.callAmount}` : `${activeGame?.currentBid?.amount}${activeGame?.currentBid?.suit?.symbol}`}</Avatar>
        )}
        <TextField
          select
          value={score}
          onChange={handleChange}
          variant="filled"
          margin="dense"
          color="primary"
          disabled={activeGame.currentHand === rowIndex + 1}
        >
          {scoreOptions.map((option, idx) => (
            <MenuItem value={option.value} key={`mi_${option.value}_${idx}`}>
              {option.value < 12 ? option.label : <em>{option.label}</em>}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
};
export default ScoreInput;
