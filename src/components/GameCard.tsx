import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import React from 'react'
import { Link } from 'react-router-dom'
import { CTX, Game } from '../ContextStore'

const StyledIconButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: 20,
    borderRadius: 4,
    '&:hover': {
      color: theme.palette.secondary.light,
      backgroundColor: red[100],
    },
  },
}))(IconButton)
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 8,
      minWidth: 300,
      maxWidth: 500,
      justifyContent: 'center',
    },
    pos: {
      marginBottom: 12,
    },
    actions: {
      justifyContent: 'space-between',
    },
  })
)

interface Props {
  game: Game
}

const GameCard: React.FC<Props> = ({ game }) => {
  const classes = useStyles()

  const { setActiveGame, setSavedGames, savedGames } = React.useContext(CTX)

  const handleLoad = () => {
    setActiveGame(game)
  }

  const handleRemoveGame = () => {
    setSavedGames(() => {
      return savedGames.filter((value: Game, index: number) => {
        return savedGames[index].id !== game.id
      })
    })
  }

  return (
    <Card className={classes.root} raised>
      <CardHeader title={`Recent ${game.players.length}-Player Game`} subheader={`${game.dateTime}`} />
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          id: {game.id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          currentBid: {game.currentBid}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          currentHand: {game.currentHand}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          onClick={handleLoad}
          size="medium"
          component={Link}
          to={`/game/?id=${game.id}`}
          variant="outlined"
          color="primary"
        >
          Load Game
        </Button>
        <StyledIconButton aria-label="delete" onClick={handleRemoveGame}>
          <DeleteForeverIcon />
        </StyledIconButton>
      </CardActions>
    </Card>
  )
}

export default GameCard
