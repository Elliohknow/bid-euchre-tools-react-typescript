import CSS from "csstype";
import React, { SyntheticEvent, useState } from "react";

type GameProps = {
  numPlayers: number;
  date?: string;
  dealer?: string;
  highestBidder?: object;
  players?: any;
};
type CardProps = {
  player: Player;
};
type Player = {
  name: string;
  gamesPlayed: number;
  wins: number;
  longestWinStreak: number;
  onWinstreakNow: boolean;
};
const dummy: Player = {
  name: "Harry",
  gamesPlayed: 0,
  wins: 0,
  longestWinStreak: 0,
  onWinstreakNow: false,
};

const Rubber = ({ numPlayers, date, players = [dummy] }: GameProps) => {
  const numDummies = numPlayers <= 4 ? 4 - numPlayers : 0;

  return (
    <div style={rubberStyles}>
      <div>This is gonna be a Rubber, folks.</div>
      <div>Probably.</div>
      <div className="date">{date ? date : "the date string goes here"}</div>
      <div className="numPlayers">number of players: {numPlayers}</div>
      <div className="numDummies">number of dummy players: {numDummies}</div>
      {players.map((player: Player) => (
        <div key={`player_${player.name}`}>{player.name}</div>
      ))}
    </div>
  );
};

const Card = ({ player }: CardProps) => {
  return (
    <div style={cardStyles}>
      <div>{player.name}</div>
      <div>{player.gamesPlayed}</div>
      <div>{player.wins}</div>
      <div>{player.longestWinStreak}</div>
      <div>{player.onWinstreakNow}</div>
    </div>
  );
};

const NewGame = () => {
  const [players, setPlayers]: any = useState([]);
  const [ready, setReady] = useState(false);
  const numPlayers = players.length;

  const startGame = (e: SyntheticEvent) => {
    e.preventDefault();
    setReady(true);
  };
  const incrementPlayers = (e: SyntheticEvent) => {
    e.preventDefault();
    let tempArray = players;
    let newPlayer = dummy;
    newPlayer.name = "???";
    tempArray.push(newPlayer);
    setPlayers(tempArray);
  };
  const decrementPlayers = (e: SyntheticEvent) => {
    e.preventDefault();
    let tempArray = players;
    tempArray.pop();
    setPlayers(tempArray);
  };
  return !ready ? (
    <React.Fragment>
      <div style={buttonWrapperStyles}>
        <button onClick={incrementPlayers} style={buttonStyles}>
          + Player
        </button>
        <button onClick={decrementPlayers} style={buttonStyles}>
          - Player
        </button>
      </div>
      <button onClick={startGame} style={startButtonStyles}>
        Start
      </button>
      <Rubber players={players} numPlayers={numPlayers} />
    </React.Fragment>
  ) : (
    <div style={{ gridTemplateColumns: `repeat(${numPlayers}, 1fr)`, width: "100%" }}>
      {players.map((player: Player) => (
        <Card key={`card_${player.name}`} player={player} />
      ))}
    </div>
  );
};

const LoadGame = () => {
  return <div></div>;
};

export default function App() {
  const [game, setGame] = useState("");

  const handleNewGame = (e: SyntheticEvent) => {
    console.log(typeof []);

    e.preventDefault();
    setGame("NEW");
  };
  const handleLoadGame = (e: SyntheticEvent) => {
    e.preventDefault();
    setGame("LOAD");
  };

  return (
    <div style={appStyles}>
      {!game && (
        <React.Fragment>
          <h1 style={h1Styles}>bid euchre tools</h1>
          <div className="button-wrapper">
            <button onClick={handleNewGame} style={buttonStyles}>
              new game
            </button>
            <button onClick={handleLoadGame} style={buttonStyles}>
              load game
            </button>
          </div>
        </React.Fragment>
      )}
      {game === "NEW" && <NewGame />}
      {game === "LOAD" && <LoadGame />}
    </div>
  );
}

const appStyles: CSS.Properties = {
  backgroundColor: "#EEEEEE",
  display: "block",
  height: "100vh",
  width: "100%",
  justifyContent: "space-between",
  textAlign: "center",
  fontSize: "16px",
};
const h1Styles: CSS.Properties = {
  textTransform: "capitalize",
  margin: "0",
};
const buttonWrapperStyles: CSS.Properties = {
  fontSize: "3em",
  textTransform: "uppercase",
};
const buttonStyles: CSS.Properties = {
  fontWeight: "bold",
  backgroundColor: "cornflowerblue",
  color: "white",
  cursor: "pointer",
  boxShadow: `
      -12px -12px 12px 0 rgba(255,255,255,1) 
      12px 12px 12px 0 rgba(0,0,0,0.03)
      `,
};
const startButtonStyles: CSS.Properties = {
  fontSize: "2em",
  textTransform: "uppercase",
  color: "royalblue",
  backgroundColor: "white",
  boxShadow: `
      -12px -12px 12px 0 rgba(255,255,255,1) 
      12px 12px 12px 0 rgba(0,0,0,0.03)
      `,
};
const rubberStyles: CSS.Properties = {
  width: "100%",
};
const cardStyles: CSS.Properties = {
  gridColumn: "span 1",
  boxShadow: `
      -12px -12px 12px 0 rgba(255,255,255,1) 
      12px 12px 12px 0 rgba(0,0,0,0.03)
      `,
};

// const suits = {
//   SPADES: "♠",
//   HEARTS: "♥",
//   DIAMONDS: "♦",
//   CLUBS: "♣",
// };
// const deckSize = 32; // (4*4)*2
