import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import React from "react";

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

interface Props {
  buttonText: string;
}
export default function CustomButton({ buttonText }: Props) {
  const classes = useStyles();

  return (
    <ColorButton variant="contained" color="primary" className={classes.margin}>
      {buttonText}
    </ColorButton>
  );
}
