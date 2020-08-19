import { Avatar, CardActionArea } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import React from "react";
import { Player } from "../ContextStore";
// import EditIcon from "@material-ui/icons/Edit";
// import HistoryIcon from "@material-ui/icons/History";
// import TouchAppIcon from "@material-ui/icons/TouchApp";
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// const StyledIconButton = withStyles((theme: Theme) => ({
//   root: {
//     backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
//     color: theme.palette.primary.main,
//     marginLeft: 20,
//     // borderRadius: 4,
//     "&:hover": {
//       color: theme.palette.getContrastText(theme.palette.primary.main),
//       backgroundColor: theme.palette.primary.main,
//     },
//   },
// }))(IconButton);
// const StyledAvatar = withStyles((theme: Theme) => ({
//   root: {
//     backgroundColor: theme.palette.secondary.main,
//     // backgroundColor: 'radial-gradiant: '
//   },
// }))(Avatar);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 8,
      margin: "1rem 2rem 1rem 2rem",
      minWidth: 350,
      maxWidth: 500,
      backgroundColor: theme.palette.background.default,
      // color: theme.palette.primary.dark,
      justifyContent: "center",
      opacity: 0.8,
      cursor: "pointer",
      "&:hover": {
        // backgroundColor: theme.palette.,
        // color: theme.palette.getContrastText(theme.palette.primary.light),
        opacity: 1,
      },
    },
    header: {
      // placeItems: "center",
      verticalAlign: "middle",
      textAlign: "left",
    },
    avatarDefault: {
      backgroundColor: theme.palette.action.disabledBackground,
    },
    avatarColor: {
      backgroundColor: theme.palette.secondary.main,
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
    <Card className={classes.root} raised onClick={handleToggle}>
      <CardActionArea>
        <CardHeader
          className={classes.header}
          title={
            <Typography variant="h5" component="h2">
              {player.nickname}
            </Typography>
          }
          avatar={
            !checkedState ? (
              <Avatar className={classes.avatarDefault} alt={`${player.nickname}`}>
                {player.nickname[0]}
              </Avatar>
            ) : (
              <Avatar className={classes.avatarColor} alt={`${player.nickname}`}>
                {player.nickname[0]}
              </Avatar>
            )
          }
          action={!checkedState ? <CheckBoxOutlineBlankIcon aria-label="unchecked" /> : <CheckBoxIcon aria-label="checked" />}
        />
        <CardContent>
          <Typography variant="body2" component="p" className="player-card-item">
            Last Win: {player?.stats?.lastWin || "¯\\_(ツ)_/¯"}
          </Typography>
          <Typography variant="body2" component="p" className="player-card-item">
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
      </CardActionArea>
    </Card>
  );
}
// <CardActions className={classes.actions}>
//   <StyledIconButton size="small" disabled>
//     <EditIcon />
//   </StyledIconButton>
// </CardActions>
