import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { CTX, Player, scoreOptions, Suit, suits } from "../ContextStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "10ch",
    },
  })
);

interface Props {
  open: boolean;
  onClose: (value?: any) => void;
  id: string;
  keepMounted: boolean;
}

const DialogSelect: React.FC<Props> = (props) => {
  const { open, onClose, ...other } = props;
  const classes = useStyles();
  const [bid, setBid] = React.useState<{ playerName: string; suit: string; amount: string | number }>({
    playerName: "",
    suit: "",
    amount: "",
  });
  const selectRef = React.useRef<HTMLElement>(null);
  const { activeGame } = React.useContext(CTX);
  // const [amount, setAmount] = React.useState<number | string>("");
  // const [suit, setSuit] = React.useState<string>("");
  // const [playerName, setPlayerName] = React.useState<string>("");

  // React.useEffect(() => {
  //   if (!open) {
  //     setValue(valueProp);
  //   }
  // }, [valueProp, open]);

  const handleEntering = () => {
    if (selectRef.current != null) {
      selectRef.current.focus();
    }
  };

  const handleChangePlayerName = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setPlayerName(String(event.target.value) || "");
    setBid((prev) => {
      return {
        ...prev,
        playerName: String(event.target.value) || "",
      };
    });
  };
  const handleChangeSuit = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setSuit(String(event.target.value) || "");
    setBid((prev) => {
      return {
        ...prev,
        suit: String(event.target.value) || "",
      };
    });
  };
  const handleChangeAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setAmount(Number(event.target.value) || "");
    setBid((prev) => {
      return {
        ...prev,
        amount: String(event.target.value) || "",
      };
    });
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = () => {
    // onClose(playerName, suit, amount);
    onClose(bid);
  };

  return (
    <Dialog
      onEntering={handleEntering}
      maxWidth="xs"
      aria-labelledby="dialog-select-title"
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={onClose}
      {...other}
    >
      <DialogTitle id="dialog-select-title">Set the Bid</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="player-select">Player</InputLabel>
            <NativeSelect
              ref={selectRef}
              value={bid.playerName}
              onChange={handleChangePlayerName}
              inputProps={{
                id: "player-select",
                name: "player",
              }}
            >
              <option aria-label="None" value={""} />
              {activeGame.players.map((value: Player, index: number) => {
                return (
                  <option key={`agp_${index}`} value={value.nickname}>
                    {value.nickname}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="amount-select">Amount</InputLabel>
            <NativeSelect
              value={bid.amount}
              onChange={handleChangeAmount}
              inputProps={{
                id: "amount-select",
                name: "amount",
              }}
            >
              <option aria-label="None" value={""} />
              {scoreOptions.map((value, index) => {
                return (
                  <option key={`so_${index}`} value={value.value}>
                    {value.label}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="suit-select">Suit</InputLabel>
            <NativeSelect
              value={bid.suit}
              onChange={handleChangeSuit}
              inputProps={{
                id: "suit-select",
                name: "suit",
              }}
            >
              <option aria-label="None" value={""} />
              {suits.map((value: Suit, index: number) => {
                return (
                  <option key={`si_${index}`} value={value.value}>
                    {value.label} {value.value}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSelect;
// <FormControl variant="outlined" className={classes.formControl}>
//               <InputLabel htmlFor="dialog-native">Amount</InputLabel>
//               <Select native value={amount} onChange={handleChange} input={<Input id="dialog-native" />}>
//                 <option aria-label="None" value="" />
//                 <option value={10}>Ten</option>
//                 <option value={20}>Twenty</option>
//                 <option value={30}>Thirty</option>
//               </Select>
//             </FormControl>
