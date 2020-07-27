import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import { Game } from "../ContextStore";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    textTransform: "none",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface SimpleCardProps {
  game: Game;
}

export default function SimpleCard({ game }: SimpleCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          created: {game.dateTime}
        </Typography>
        <Typography variant="h5" component="h2">
          {game.players.length}-Player Game
        </Typography>
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
        <Button size="large" component={Link} to={`/active/${game.id}`} variant="contained">
          Load Game
        </Button>
      </CardActions>
    </Card>
  );
}
