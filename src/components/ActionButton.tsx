import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
// import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      position: "relative",
      minHeight: 200,
    },
    fabPrev: {
      position: "absolute",
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
    fabBid: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
    fabNext: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export default function FloatingActionButtonZoom() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const fabs = [
    {
      color: "secondary" as "secondary",
      className: classes.fabPrev,
      icon: <KeyboardArrowLeftIcon />,
      label: "Previous Turn",
    },
    {
      color: "primary" as "primary",
      className: classes.fabBid,
      icon: <EmojiPeopleIcon />,
      label: "Make Bid",
    },
    {
      color: "secondary" as "secondary",
      className: classes.fabNext,
      icon: <KeyboardArrowRightIcon />,
      label: "Next Turn",
    },
  ];

  return (
    <div className={classes.root}>
      {fabs.map((fab, index) => (
        <Fab aria-label={fab.label} className={fab.className} color={fab.color} key={`fab_${fab.color}_${index}`}>
          {fab.icon}
        </Fab>
      ))}
    </div>
  );
}
