import * as React from "react";
import { useCookie, useLocalStorage } from "./hooks";
import { PlayerList } from "./interfaces";

export interface StoreProps {
  children: React.ReactNode;
}

export const CTX = React.createContext({});

const defaultPlayers: PlayerList = [
  {
    id: "player_1",
    nickname: "Player 1",
  },
  {
    id: "player_2",
    nickname: "Player 2",
  },
  {
    id: "player_3",
    nickname: "Player 3",
  },
  {
    id: "player_4",
    nickname: "Player 4",
  },
];

const Store: React.FC<StoreProps> = (props) => {
  const [players, updatePlayers] = useLocalStorage("players", JSON.stringify(defaultPlayers));
  const [games, updateGames] = useCookie("games", "");

  // React.useEffect(() => createPlayers(), [])

  return (
    <CTX.Provider
      value={{
        players,
        updatePlayers,
        games,
        updateGames,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
};
export default Store;

// function calcExpirationDate() {
//   const now = new Date();
//   // set the time to be now + 30 days
//   now.setTime(now.getTime() + 30 * 60 * 60 * 24 * 1000);
//   return now;
// }

// export function getItem(key: string) {
//   return document.cookie.split("; ").reduce((total, currentCookie) => {
//     const item = currentCookie.split("=");
//     const storedKey = item[0];
//     const storedValue = item[1];
//     return key === storedKey ? decodeURIComponent(storedValue) : total;
//   }, "");
// }

// export function setItem(key: string, value: string) {
//   const now = calcExpirationDate();
//   document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
// }

// // let getPromise = () => {
// //   return new Promise((resolve) => setTimeout(resolve, 0));
// // }
// function getTotalGamesPlayed() {
//   let total = getItem("total_games_played") ?? "0";
//   return parseInt(total);
// }
// function setTotalGamesPlayed(total: number) {
//   setItem("total_games_played", total.toString());
// }
// function incrementTotalGamesPlayed() {
//   let total = getTotalGamesPlayed();
//   let newTotal = total + 1;
//   setTotalGamesPlayed(newTotal);
//   return newTotal;
// }
// export const saveNewGame = (numPlayers: number, players: Player[]) => {
//   const gameId = incrementTotalGamesPlayed();
//   const dateTime = formatDateTime();
//   const newGame: Game = {
//     id: `game_${gameId}`,
//     dateTime: dateTime,
//     numPlayers: numPlayers,
//     players: players,
//     complete: false,
//   };
//   setItem(`game_${gameId}`, JSON.stringify(newGame));
// };
// export const saveCurrentGame = (currentGame: Game) => {
//   setItem(`game_${currentGame.id}`, JSON.stringify(currentGame));
// };
// export const loadSavedGame = (key: string) => {
//   let game = getItem(key) ?? "$#!%";
//   if (game === "$#!%") throw new Error(game);
//   else return JSON.parse(game);
// };
