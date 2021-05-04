import { Avatar, CardActionArea } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Player } from '../ContextStore'
// import EditIcon from "@material-ui/icons/Edit";
// import HistoryIcon from "@material-ui/icons/History";
// import TouchAppIcon from "@material-ui/icons/TouchApp";
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 8,
      marginTop: '1rem',
      marginRight: '2rem',
      marginBottom: '1rem',
      marginLeft: '2rem',
      minWidth: 350,
      maxWidth: 500,
      backgroundColor: theme.palette.background.default,
      // color: theme.palette.primary.dark,
      justifyContent: 'center',
      opacity: 0.8,
      cursor: 'pointer',
      '&:hover': {
        // backgroundColor: theme.palette.,
        // color: theme.palette.getContrastText(theme.palette.primary.light),
        opacity: 1,
      },
    },
    header: {
      // placeItems: "center",
      verticalAlign: 'middle',
      textAlign: 'left',
    },
    avatarUnchecked: {
      backgroundColor: theme.palette.secondary.main,
      opacity: 0.5,
    },
    avatarChecked: {
      backgroundColor: theme.palette.primary.main,
    },
  })
)

interface Props {
  player: Player
  onToggle: (v: Player) => void
}

const PlayerCard: React.FC<Props> = ({ player, onToggle }) => {
  const [checkedState, setCheckedState] = React.useState<boolean>(true)
  const classes = useStyles()
  // const [count, setCount] = React.useState(0);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // setCount(count + 1);
    e.preventDefault()
    setCheckedState(prev => !prev)
    onToggle(player)
  }

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
            // !checkedState ? (
            <Avatar
              className={checkedState ? classes.avatarChecked : classes.avatarUnchecked}
              alt={`${player.nickname}`}
            >
              {player.nickname[0]}
            </Avatar>
            // ) : (
            //   <Avatar className={classes.avatarColor} alt={`${player.nickname}`}>
            //     {player.nickname[0]}
            //   </Avatar>
            // )
          }
          // action={!checkedState ? <CheckBoxOutlineBlankIcon aria-label="unchecked" /> : <CheckBoxIcon aria-label="checked" />}
        />
        <CardContent>
          <Typography variant="body2" component="p" className="player-card-item">
            Last Win: {player?.stats?.lastWin || '¯\\_(ツ)_/¯'}
          </Typography>
          <Typography variant="body2" component="p" className="player-card-item">
            Games Played: {player?.stats?.gamesPlayed || '¯\\_(ツ)_/¯'}
          </Typography>
          <Typography variant="body2" component="p" className="player-card-item">
            Wins: {player?.stats?.wins || '¯\\_(ツ)_/¯'}
          </Typography>
          <Typography variant="body2" component="p" className="player-card-item">
            Bids Taken: {player?.stats?.totalBidsTaken || '¯\\_(ツ)_/¯'}
          </Typography>
          <Typography variant="body2" component="p" className="player-card-item">
            Up-The-River Count: {player?.stats?.upRiverCount || '¯\\_(ツ)_/¯'}
          </Typography>
          <Typography variant="body2" component="p" className="player-card-item">
            Call Count: {player?.stats?.callCount || '¯\\_(ツ)_/¯'}
          </Typography>
          <Typography variant="body2" component="p" className="player-card-item">
            Favored Suit: {player?.stats?.favoredSuit || '¯\\_(ツ)_/¯'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default PlayerCard
// <CardActions className={classes.actions}>
//   <StyledIconButton size="small" disabled>
//     <EditIcon />
//   </StyledIconButton>
// </CardActions>
