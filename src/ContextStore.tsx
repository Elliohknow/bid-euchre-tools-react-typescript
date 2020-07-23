import React from "react";
import { formatDateTime, UUID } from "./utils";

export interface Props {
  children: React.ReactNode;
}
export interface Game {
  id: string;
  dateTime: Date | string;
  players: Player[];
  winner: Player | null;
  // numPlayers: number;
}
export interface Player {
  id: string;
  nickname: string;
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  bidsTaken?: number;
  callCount?: number;
  upRiverCount?: number;
  luckySuit?: Suit;
}
export interface Suit {
  name?: string;
  symbol?: string;
}

const defaultPlayers: Player[] = [
  {
    id: "player_1",
    nickname: "Pat",
  },
  {
    id: "player_2",
    nickname: "Elliott",
  },
  {
    id: "player_3",
    nickname: "Liz",
  },
];
const defaultGames: Game[] = [
  {
    id: UUID(),
    dateTime: formatDateTime(),
    players: defaultPlayers,
    winner: null,
  },
];
interface ContextProps {
  players: Player[];
  setPlayers: (v: any) => void;
  oldGames: Game[];
  setOldGames: (v: any) => void;
  savedGames: Game[] | any[];
  setSavedGames: (v: any) => void; //| React.Dispatch<React.SetStateAction<any[]>>;
}
//   interface ContextProps {
//     data: DataProps;
//     setData: (v: any) => void;
//   }
//   interface DataProps {
//   players: Player[];
//   savedGames?: Game[];
//   oldGames?: Game[];
// }

export const CTX = React.createContext<ContextProps>(undefined!);

const ContextStore: React.FC<Props> = (props) => {
  // const [players, setPlayers] = useLocalStorage("players", JSON.stringify(defaultPlayers));
  // const [savedGames, setSavedGames] = useLocalStorage("saved-games", JSON.stringify(defaultGames));
  // const [oldGames, setOldGames] = useLocalStorage("old-games", JSON.stringify(defaultGames));
  const [players, setPlayers] = React.useState(defaultPlayers);
  const [savedGames, setSavedGames] = React.useState(defaultGames);
  const [oldGames, setOldGames] = React.useState(defaultGames);
  // const [players, setPlayers] = React.useState(()=> {
  //   const pArray = localStorage.getItem("players");
  //   if (pArray===null) {
  //     return defaultPlayers;
  //   } else return JSON.parse(pArray);
  // });
  // const [current, ]
  // function getSavedGames() {
  //   return oldGames.filter((game: Game) => game.winner === null);
  // }
  React.useEffect(() => {
    const pData = localStorage.getItem("players");
    const sgData = localStorage.getItem("saved-games");
    const ogData = localStorage.getItem("old-games");
    try {
      if (pData) setPlayers(JSON.parse(pData));
      if (sgData) setSavedGames(JSON.parse(sgData));
      if (ogData) setOldGames(JSON.parse(ogData));
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("saved-games", JSON.stringify(savedGames));
    localStorage.setItem("old-games", JSON.stringify(oldGames));
  });

  return (
    <CTX.Provider
      value={{
        // data,
        // setData,
        players,
        setPlayers,
        oldGames,
        setOldGames,
        savedGames,
        setSavedGames,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
};
export default ContextStore;

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
