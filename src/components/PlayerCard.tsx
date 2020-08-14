import { Avatar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { purple } from "@material-ui/core/colors";
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
      justifyContent: "center",
      opacity: 0.8,
      // cursor: "pointer",
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
  onToggle: (v: any) => void;
  // addNewPlayer: (v: any) => void;
}

export default function PlayerCard({ player, onToggle }: Props) {
  const [checkedState, setCheckedState] = React.useState(false);
  // const [count, setCount] = React.useState(0);
  const classes = useStyles();
  const handleToggle = () => {
    // setCount(count + 1);
    setCheckedState(!checkedState);
    // onToggle(player);
  };

  React.useEffect(() => {
    if (checkedState) {
      onToggle(player);
      console.log({ player });
    }
  }, [checkedState]);

  return (
    <Card className={classes.root} raised onClick={handleToggle}>
      <CardHeader
        avatar={<Avatar alt={`${player.nickname}`}></Avatar>}
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
        subheader={`Last Win: ${player?.stats?.lastWin}`}
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
