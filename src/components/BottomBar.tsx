import { AppBar, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React from "react";
import { CTX, Game } from "../ContextStore";
import DialogSelect from "./DialogSelect";
// import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      zIndex: theme.zIndex.appBar,
      position: "absolute",
      top: "auto",
      bottom: 0,
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    column: {
      gridColumnEnd: "span 4",
      width: "100%",
      // "&:hover": {
      //   backgroundColor: "var(--offwhite)",
      // },
      "& > button:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
      },
    },
  })
);

const BottomBar: React.FC = () => {
  const classes = useStyles();
  const [hand, setHand] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { setActiveGame } = React.useContext(CTX);

  const handleLast = () => {
    hand > 0 ? setHand((prev) => prev - 1) : showAlert();
  };
  const handleNext = () => {
    hand < 8 ? setHand((prev) => prev + 1) : showAlert();
  };
  const showAlert = () => {
    alert("cannot complete this action. the hand you are looking for does not exist.");
    console.log({ hand });
  };
  const handleOpen = () => {
    setOpen(true);
    console.log({ open });
  };
  const handleClose = (bid?: { playerName: string; suit: string; amount: string | number }) => {
    setOpen(false);
    console.log({ open });

    if (bid?.playerName && bid?.suit && bid?.amount) {
      setActiveGame((prev: Game) => {
        return {
          ...prev,
          currentBid: {
            player: prev?.players.find((player) => player.nickname === bid.playerName),
            suit: bid.suit,
            amount: bid.amount,
          },
        };
      });
    }
  };

  return (
    <AppBar position="sticky" color="primary" className={classes.root}>
      <Toolbar className={classes.container}>
        <div className={classes.column}>
          <IconButton color="primary" aria-label="Previous Hand" onClick={handleLast}>
            <KeyboardArrowLeftIcon />
          </IconButton>
        </div>
        <div className={classes.column}>
          <IconButton color="secondary" onClick={handleOpen} aria-label="Set Current Bid" aria-haspopup="true" role="set bid button">
            <EmojiPeopleIcon />
          </IconButton>
        </div>
        <div className={classes.column}>
          <IconButton color="primary" aria-label="Next Hand" onClick={handleNext}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
        <DialogSelect open={open} onClose={handleClose} keepMounted id="bid-menu" />
      </Toolbar>
    </AppBar>
  );
};
export default BottomBar;
// const fabs = [
//   {
//     onClick: hand > 0 ? handleLast : showAlert,
//   },
//   {
//     onClick: handleOpen,
//   },
//   {
//     onClick: hand < 8 ? handleNext : showAlert,
//   },
// ];
