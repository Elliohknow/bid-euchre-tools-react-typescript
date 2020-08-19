import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Player } from "../ContextStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formControl: {
      display: "none",
    },
  })
);

interface Props {
  player: Player;
  handleScore: any;
}

const ScoreInput: React.FC<Props> = ({ player, handleScore }) => {
  const classes = useStyles();
  const [score, setScore] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setScore(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleOpen}>Open the select</Button>
      <FormControl className={classes.formControl}>
        <Select open={open} onClose={handleClose} onOpen={handleOpen} value={score} onChange={handleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>
            <em>Call for 2</em>
          </MenuItem>
          <MenuItem value={18}>
            <em>Call for 1</em>
          </MenuItem>
          <MenuItem value={24}>
            <em>Shoot the Moon</em>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default ScoreInput;
