import CSS from "csstype";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { getDateTime } from "./utils";

const suits = {
  SPADES: "♠",
  HEARTS: "♥",
  DIAMONDS: "♦",
  CLUBS: "♣",
};

type RubberProps = {
  date: string;
  numPlayers: number;
  dealer?: string;
  highestBidder?: object;
  players?: object;
};

const Rubber = ({ date, numPlayers, players }: RubberProps) => {
  return (
    <div className="">
      <div>This is gonna be a Rubber, folks.</div>
      <div>Probably.</div>
      <div className="date">{date}</div>
      <div className="num-players">number of players: {numPlayers}</div>
      <div className="num-dummies">number of dummy players: {numPlayers <= 4 ? 4 - numPlayers : 0}</div>
    </div>
  );
};

const LoadGame = () => {};

const NewGame = () => {};

export default function App() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [date, setDate]: any = useState(null);

  useEffect(() => setDate(getDateTime()));

  const incrementPlayers = (e: SyntheticEvent) => {
    e.preventDefault();
    setNumPlayers(numPlayers + 1);
  };
  const decrementPlayers = (e: SyntheticEvent) => {
    e.preventDefault();
    setNumPlayers(numPlayers - 1);
  };

  return (
    <div style={appStyles}>
      eyyyyyy
      <div className="button-wrapper">
        <button onClick={incrementPlayers} style={{ fontWeight: "bold", backgroundColor: "royalblue", color: "white" }}>
          + Player
        </button>
        <button onClick={decrementPlayers} style={{ fontWeight: "bold", backgroundColor: "royalblue", color: "white" }}>
          - Player
        </button>
      </div>
      <Rubber date={date} numPlayers={numPlayers} />
    </div>
  );
}

const appStyles: CSS.Properties = {
  display: "block",
  width: "100%",
  justifyContent: "space-between",
  textAlign: "center",
};
