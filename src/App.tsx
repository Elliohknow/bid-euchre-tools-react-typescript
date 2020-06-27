import React, { SyntheticEvent, useEffect, useState } from "react";

type TableProps = {
  date: string;
  numPlayers: number;
  players?: object;
};

const getDateTime = () => {
  const date = new Date(Date.now());
  // const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date.getDay());
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `
      ${day}, ${hours > 12 ? hours - 12 : hours < 1 ? 12 : hours}:${("0" + minutes).slice(-2)} ${hours >= 12 ? "PM" : "AM"}
    `;
};

const Table = ({ date, numPlayers, players }: TableProps) => {
  return (
    <div className="table">
      this is gonna be a table, folks. {"\n"}
      Probably.
      <div className="date">{date}</div>
      <div className="num-players">{numPlayers}</div>
    </div>
  );
};

export default function App() {
  const [numPlayers, setNumPlayers] = useState(1);
  const [date, setDate]: any = useState();

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
    <div className="App">
      <div style={{ display: "flex" }}>
        eyyyyyy
        <button onClick={incrementPlayers}>increment</button>
        <button onClick={decrementPlayers}>decrement</button>
        <Table date={date} numPlayers={numPlayers} />
      </div>
    </div>
  );
}

// const styles = {
//   container: {
//     display: "grid",
//     gridTemplateColumns: `${}`,
//   },
// };
