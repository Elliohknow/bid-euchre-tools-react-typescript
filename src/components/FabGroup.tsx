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
      zIndex: theme.zIndex.appBar,
    },
    fabBid: {
      position: "absolute",
      bottom: theme.spacing(2),
      marginRight: "50%",
      zIndex: theme.zIndex.appBar,
    },
    fabNext: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: theme.zIndex.appBar,
    },
  })
);

const FabGroup: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleGoToPreviousHand = () => {
    // e.preventDefault();
    setValue((prev) => prev - 1);
  };
  const handleGoToNextHand = () => {
    // e.preventDefault();
    setValue((prev) => prev + 1);
    console.log({ value });
  };

  const showAlert = () => {
    // e.preventDefault();
    console.log("cannot complete this action. the hand you are looking for does not exist.");
    console.log({ value });
  };
  const handleOpen = () => {
    setOpen((prev) => !prev);
    console.log("Should open now", open);
  };
  // const handleBid = () => {
  //   // setValue(index);
  // };

  const fabs = [
    {
      color: "primary" as "primary",
      className: classes.fabPrev,
      icon: <KeyboardArrowLeftIcon />,
      label: "Previous Hand",
      variant: "round",
      onClick: value > 0 ? handleGoToPreviousHand : showAlert,
    },
    {
      color: "secondary" as "secondary",
      className: classes.fabBid,
      icon: <EmojiPeopleIcon />,
      component: <DialogSelect open={open} setOpen={setOpen} />,
      label: "Make Bid",
      variant: "extended",
      onClick: handleOpen,
    },
    {
      color: "primary" as "primary",
      className: classes.fabNext,
      icon: <KeyboardArrowRightIcon />,
      label: "Next Hand",
      variant: "round",
      onClick: value < 8 ? handleGoToNextHand : showAlert,
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
};
export default FabGroup;
