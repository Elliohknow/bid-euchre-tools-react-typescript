import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { CTX, Game, Player, scoreOptions, Suit, suits } from "../ContextStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
// //"♠ ♥ ♦ ♣"
// const suits: Suit[] = [
//   {
//     value: "",
//     label: "",
//   },
//   {
//     value: "Spades",
//     label: "♠",
//   },
//   {
//     value: "Hearts",
//     label: "♥",
//   },
//   {
//     value: "Diamonds",
//     label: "♦",
//   },
//   {
//     value: "Clubs",
//     label: "♣",
//   },
//   {
//     value: "None",
//     label: "🃏",
//   },
// ];

const DialogSelect: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<number | string>("");
  const [suit, setSuit] = React.useState<string>("");
  const [playerName, setPlayerName] = React.useState<string>("");
  const { activeGame, setActiveGame } = React.useContext(CTX);

  const handleChangePlayerName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlayerName(String(event.target.value) || "");
  };
  const handleChangeAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(Number(event.target.value) || "");
  };
  const handleChangeSuit = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSuit(String(event.target.value) || "");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    if (amount) {
      setAmount("");
    }
    if (suit) {
      setSuit("");
    }
    if (playerName) {
      setPlayerName("");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (playerName && amount && suit) {
      setActiveGame((prev: Game) => {
        return {
          ...prev,
          currentBid: {
            player: prev?.players.find((player) => player.nickname === playerName),
            amount: amount,
            suit: suit,
          },
        };
      });
      console.log({ playerName, amount, suit });
      handleClose();
    } else {
      console.log("Could not submit invalid bid.");
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set the Bid</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="dialog-select-label-1">Player</InputLabel>
              <Select labelId="dialog-select-label-1" id="dialog-select-1" name="player" value={playerName} onChange={handleChangePlayerName} input={<Input />}>
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {activeGame.players.map((value: Player, index: number) => {
                  return <MenuItem value={value?.nickname}>{value?.nickname}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="dialog-select-label-2">Amount</InputLabel>
              <Select labelId="dialog-select-label-2" id="dialog-select-2" name="amout" value={amount} onChange={handleChangeAmount} input={<Input />}>
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {scoreOptions.map((value, index) => {
                  return <MenuItem value={value.value}>{value.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="dialog-select-label-3">Suit</InputLabel>
              <Select labelId="dialog-select-label-3" id="dialog-select-3" name="suit" value={suit} onChange={handleChangeSuit} input={<Input />}>
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {suits.map((value: Suit, index: number) => {
                  return <MenuItem value={value.value}>{value.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogSelect;
// <FormControl className={classes.formControl}>
//               <InputLabel htmlFor="dialog-native">Amount</InputLabel>
//               <Select native value={amount} onChange={handleChange} input={<Input id="dialog-native" />}>
//                 <option aria-label="None" value="" />
//                 <option value={10}>Ten</option>
//                 <option value={20}>Twenty</option>
//                 <option value={30}>Thirty</option>
//               </Select>
//             </FormControl>
