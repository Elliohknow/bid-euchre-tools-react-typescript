import { AppBar, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
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
      zIndex: theme.zIndex.appBar,
      top: "auto",
      bottom: 0,
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: theme.spacing(1),
    },
    column: {
      position: "absolute",
      bottom: theme.spacing(2),
      gridColumnEnd: "span 3",
    },
  })
);

const BottomBar: React.FC = () => {
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

  return (
    <AppBar position="sticky" color="primary" className={classes.root}>
      <Toolbar className={classes.container}>
        <div className={classes.column}>
          <IconButton color="inherit" aria-label="Previous Hand">
            <KeyboardArrowLeftIcon />
          </IconButton>
        </div>
        <div className={classes.column}>
          <IconButton color="primary" aria-label="Set Current Bid">
            <EmojiPeopleIcon />
          </IconButton>
          <DialogSelect open={open} setOpen={setOpen} />
        </div>
        <div className={classes.column}>
          <IconButton color="inherit" aria-label="Next Hand">
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default BottomBar;
// const fabs = [
//   {
//     onClick: value > 0 ? handleGoToPreviousHand : showAlert,
//   },
//   {
//     onClick: handleOpen,
//   },
//   {
//     onClick: value < 8 ? handleGoToNextHand : showAlert,
//   },
// ];
