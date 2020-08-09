import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { purple, red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { Link } from "react-router-dom";
import { CTX, Game } from "../ContextStore";

const StyledIconButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.getContrastText(red[600]),
    color: red[500],
    marginLeft: 20,
    borderRadius: 4,
    "&:hover": {
      color: red[700],
      backgroundColor: red[100],
    },
  },
}))(IconButton);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 8,
      minWidth: 300,
      maxWidth: 500,
      justifyContent: "center",
    },
    btn: {
      backgroundColor: theme.palette.getContrastText(purple[400]),
      color: purple[400],
      "&:hover": {
        color: purple[600],
        backgroundColor: purple[50],
      },
    },
    pos: {
      marginBottom: 12,
    },
    actions: {
      justifyContent: "space-between",
    },
  })
);

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const classes = useStyles();

  const { setActiveGame, setSavedGames, savedGames } = React.useContext(CTX);

  const handleLoad = () => {
    setActiveGame(game);
  };

  const handleRemoveGame = () => {
    setSavedGames(() => {
      return savedGames.filter((value: Game, index: number) => {
        return savedGames[index].id !== game.id;
      });
    });
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={`Recent ${game.players.length}-Player Game`} subheader={`${game.dateTime}`} />
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          id: {game.id}
        </Typography>
        <Typography variant="body2" component="p">
          body of card
          <br />
          {'"some quoted text"'}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleLoad} size="medium" component={Link} to={`/active/?id=${game.id}`} variant="outlined" color="primary" className={classes.btn}>
          Load Game
        </Button>
        <StyledIconButton aria-label="delete" onClick={handleRemoveGame}>
          <DeleteForeverIcon />
        </StyledIconButton>
      </CardActions>
    </Card>
  );
}
