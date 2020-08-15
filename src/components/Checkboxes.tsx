import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { CTX } from "../ContextStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);
interface Props {
  // player: Player;
  onToggle: (v: any) => void;
}
const CheckboxCards: React.FC<Props> = ({ onToggle }) => {
  const classes = useStyles();
  const { players } = React.useContext(CTX);
  const [state, setState] = React.useState({
    pat: true,
    elliott: true,
    liz: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { pat, elliott, liz } = state;
  const error = [pat, elliott, liz].filter((v) => v).length === 0;

  return (
    <div className={classes.root}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={pat} onChange={handleChange} name="gilad" />} label={`${pat ? "Pat" : "P-Jay"}`} />
          <FormControlLabel control={<Checkbox checked={elliott} onChange={handleChange} name="jason" />} label={`${elliott ? "Elliott" : "エリーオット"}`} />
          <FormControlLabel control={<Checkbox checked={liz} onChange={handleChange} name="antoine" />} label={`${liz ? "Liz" : "Betty"}`} />
        </FormGroup>
      </FormControl>
    </div>
  );
};
export default CheckboxCards;
//<FormHelperText>Must Select at least</FormHelperText>
