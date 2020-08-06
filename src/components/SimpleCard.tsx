import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import React from "react";
import { Link } from "react-router-dom";
import { CTX, Game } from "../ContextStore";
// import CloseIcon from "@material-ui/icons/Close";
// import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    justifyContent: "center",
  },
  // title: {
  //   fontSize: 14,
  // },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
  game: Game;
}

export default function SimpleCard({ game }: Props) {
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
      <CardHeader
        action={
          <IconButton aria-label="remove" onClick={handleRemoveGame}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          // <CloseIcon />
          // <DeleteIcon />
        }
        title={`Recent ${game.players.length}-Player Game`}
        subheader={`${game.dateTime}`}
      />
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
      <CardActions>
        <Button onClick={handleLoad} size="large" component={Link} to={`/active/?id=${game.id}`} variant="contained">
          Load Game
        </Button>
      </CardActions>
    </Card>
  );
}
