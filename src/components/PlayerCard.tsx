import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { green, purple } from "@material-ui/core/colors";
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

const StyledIconButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.getContrastText(green[600]),
    color: green[500],
    marginLeft: 20,
    borderRadius: 4,
    "&:hover": {
      color: green[700],
      backgroundColor: green[100],
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
      justifyContent: "center",
      opacity: 0.8,
      cursor: "pointer",
      "&:hover": {
        opacity: 1,
        marginTop: 13,
        // backgroundImage: PersonAddIcon
      },
    },
    btn: {
      backgroundColor: theme.palette.getContrastText(purple[400]),
      color: purple[400],
      "&:hover": {
        color: purple[600],
        backgroundColor: purple[50],
      },
    },
    actions: {
      justifyContent: "space-between",
    },
  })
);

interface Props {
  player: Player;
  onToggle: any;
  // addNewPlayer: (v: any) => void;
}

export default function PlayerCard({ player, onToggle }: Props) {
  const [checkedState, setCheckedState] = React.useState(false);
  // const [count, setCount] = React.useState(0);
  const classes = useStyles();
  const handleToggle = (e: React.SyntheticEvent) => {
    // setCount(count + 1);
    e.preventDefault();
    setCheckedState(!checkedState);
    onToggle(player);
  };

  React.useEffect(() => {
    if (checkedState) {
      onToggle(player);
    }
  }, [checkedState]);

  return (
    <Card className={classes.root} raised onClick={handleToggle}>
      <CardHeader
        title={`${player.nickname}`}
        subheader={`Last Win: ${player.lastWin}`}
        actions={
          !checkedState ? (
            <IconButton>
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          ) : (
            <IconButton>
              <CheckBoxIcon />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Typography color="textSecondary" className="player-card-item">
          Games Played: {player?.gamesPlayed || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Wins: {player?.wins || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Bids Taken: {player?.bidsTaken || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Up-The-River Count: {player?.upRiverCount || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Call Count: {player?.callCount || "¯\\_(ツ)_/¯"}
        </Typography>
        <Typography variant="body2" component="p" className="player-card-item">
          Lucky Suit: {player?.luckySuit || "¯\\_(ツ)_/¯"}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
