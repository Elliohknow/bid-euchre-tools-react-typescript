import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React from "react";
import DialogSelect from "./DialogSelect";
// import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

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
      marginRight: theme.spacing(1),
    },
    fabNext: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

interface Props {
  props: any;
}

export default function FloatingActionButton<Props>({ props }: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleGoToPreviousHand = (event: unknown) => {
    setValue(value - 1);
  };
  const handleGoToNextHand = (event: unknown) => {
    setValue(value + 1);
  };

  // const handleBid = () => {
  //   // setValue(index);
  // };

  const fabs = [
    {
      color: "primary" as "primary",
      className: classes.fabPrev,
      icon: <KeyboardArrowLeftIcon />,
      label: "Previous Turn",
      variant: "round",
      onClick: handleGoToPreviousHand,
    },
    {
      color: "secondary" as "secondary",
      className: classes.fabBid,
      icon: <EmojiPeopleIcon />,
      component: <DialogSelect />,
      label: "Make Bid",
      variant: "extended",
      // onClick: handleBid,
    },
    {
      color: "primary" as "primary",
      className: classes.fabNext,
      icon: <KeyboardArrowRightIcon />,
      label: "Next Turn",
      variant: "round",
      onClick: handleGoToNextHand,
    },
  ];

  return (
    <div className={classes.root}>
      {fabs.map((fab, index) => (
        <Fab
          aria-label={fab.label}
          className={fab.className}
          color={fab.color}
          variant={fab.variant === "round" ? "round" : "extended"}
          onClick={fab?.onClick}
          key={`fab_${fab.color}_${index}`}
        >
          {fab.icon} {fab.variant === "extended" && "Set Bid"}
        </Fab>
      ))}
    </div>
  );
}
