import { Avatar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Player } from "../ContextStore";
// import HistoryIcon from "@material-ui/icons/History";
// import TouchAppIcon from "@material-ui/icons/TouchApp";
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// const BackgroundCheckBox
const StyledIconButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
    color: theme.palette.primary.main,
    marginLeft: 20,
    borderRadius: 4,
    "&:click": {
      color: theme.palette.getContrastText(theme.palette.primary.light),
      backgroundColor: theme.palette.primary.light,
    },
  },
}))(IconButton);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 8,
      marginTop: 15,
      minWidth: 300,
      maxWidth: 500,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.dark,
      justifyContent: "center",
      opacity: 0.8,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        opacity: 1,
        marginTop: 13,
      },
    },
    checked: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    actions: {
      justifyContent: "space-between",
    },
  })
);

interface Props {
  player: Player;
  onToggle: (v: Player) => void;
}

export default function PlayerCard({ player, onToggle }: Props) {
  const [checkedState, setCheckedState] = React.useState(true);
  const classes = useStyles();
  // const [count, setCount] = React.useState(0);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // setCount(count + 1);
    e.preventDefault();
    setCheckedState((prev) => !prev);
    onToggle(player);
  };

  return (
    <Card className={checkedState ? (classes.root, classes.checked) : classes.root} raised onClick={handleToggle}>
      <CardHeader
        avatar={<Avatar alt={`${player.nickname}`}>{player.nickname[0]}</Avatar>}
        action={
          !checkedState ? (
            <StyledIconButton aria-label="unchecked">
              <CheckBoxOutlineBlankIcon />
            </StyledIconButton>
          ) : (
            <StyledIconButton aria-label="checked">
              <CheckBoxIcon />
            </StyledIconButton>
          )
        }
        title={`${player.nickname}`}
        subheader={`Last Win: ${player?.stats?.lastWin || "¯\\_(ツ)_/¯"}`}
      />
      <CardContent>
        <Typography color="textSecondary" className="player-card-item">
          Games Played: {player?.stats?.gamesPlayed || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Wins: {player?.stats?.wins || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Bids Taken: {player?.stats?.totalBidsTaken || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Up-The-River Count: {player?.stats?.upRiverCount || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Call Count: {player?.stats?.callCount || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Favored Suit: {player?.stats?.favoredSuit || "¯\\_(ツ)_/¯"}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <StyledIconButton size="small" disabled>
          <EditIcon />
        </StyledIconButton>
      </CardActions>
    </Card>
  );
}
