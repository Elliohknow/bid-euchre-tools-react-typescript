import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { formatDateTime, getDealersForHands, getRandomInitialDealer, UUID } from "./utils";

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#006064",
      dark: "#004346",
      light: "#337f83",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ad1457",
      dark: "#790e3c",
      light: "#bd4378",
      contrastText: "#fff",
    },
  },
});

export interface Props {
  children: React.ReactNode;
}
export interface Game {
  id: string;
  dateTime: string;
  players: Array<Player>;
  winner: any;
  numHands: number;
  hands: number[];
  dealers: string[];
  currentHand: number;
  currentDealer: number;
  currentLeader?: any;
  currentBid?: Bid;
  bids?: any;
}
export interface Player {
  id: string;
  nickname: string;
  currentScore: number;
  hands?: any;
  stats?: PlayerStats;
}
export interface PlayerStats {
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  totalBidsTaken?: number;
  favoredSuit?: Suit;
  lastWin?: string;
  callCount?: number;
  upRiverCount?: number;
}
export interface Suit {
  value: string;
  label: string;
}
export interface Bid {
  amount: number | string;
  suit: Suit;
  player: Player;
  row: number;
  call?: boolean;
  callAmount?: number;
}
export interface ScoreOption {
  value: number;
  label: string;
}
//"♠ ♥ ♦ ♣ ☯"
export const suits: Suit[] = [
  {
    value: "Spades",
    label: "♠",
  },
  {
    value: "Hearts",
    label: "♥",
  },
  {
    value: "Diamonds",
    label: "♦",
  },
  {
    value: "Clubs",
    label: "♣",
  },
  {
    value: "No trump",
    label: "☯",
  },
];

export const scoreOptions: ScoreOption[] = [
  { value: 0, label: "" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 12, label: "Call (12)" },
  { value: 18, label: "Call (18)" },
  { value: 24, label: "ShM (24)" },
];

export const defaultPlayers: Array<Player> = [
  {
    id: "player_1",
    nickname: "Pat",
    currentScore: 0,
    hands: [],
  },
  {
    id: "player_2",
    nickname: "Elliott",
    currentScore: 0,
    hands: [],
  },
  {
    id: "player_3",
    nickname: "Liz",
    currentScore: 0,
    hands: [],
  },
];

export const defaultHands: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
export const defaultDealer: number = getRandomInitialDealer(defaultPlayers.length);
export const defaultDealers: string[] = getDealersForHands(defaultHands, defaultPlayers, defaultDealer);
const defaultGames: Array<Game> = [
  {
    id: `test_${UUID()}`,
    dateTime: formatDateTime(),
    players: defaultPlayers,
    winner: null,
    numHands: 8,
    hands: defaultHands,
    currentHand: 1,
    currentDealer: defaultDealer,
    dealers: defaultDealers,
  },
];
export const defaultActiveGame: Game = {
  id: `test_${UUID()}`,
  dateTime: formatDateTime(),
  players: defaultPlayers,
  winner: null,
  numHands: 8,
  hands: defaultHands,
  currentHand: 1,
  currentDealer: defaultDealer,
  dealers: defaultDealers,
};
const defaultOldGames: any = [{ winner: "Estelle" }];
interface ContextProps {
  players: Player[];
  setPlayers: (v: any) => void;
  savedGames: Game[];
  setSavedGames: (v: any) => void;
  activeGame: Game;
  setActiveGame: (v: any) => void;
  oldGames: any;
  setOldGames: (v: any) => void;
}

export const CTX = React.createContext<ContextProps>(undefined!);

const ContextStore: React.FC<Props> = (props) => {
  const [players, setPlayers] = React.useState(defaultPlayers);
  const [savedGames, setSavedGames] = React.useState(defaultGames);
  const [activeGame, setActiveGame] = React.useState(defaultActiveGame);
  const [oldGames, setOldGames] = React.useState(defaultOldGames);

  React.useEffect(() => {
    const pData = localStorage.getItem("players");
    const sgData = localStorage.getItem("saved-games");
    const agData = localStorage.getItem("active-game");
    const ogData = localStorage.getItem("old-games");
    try {
      if (pData) setPlayers(JSON.parse(pData));
      if (sgData) setSavedGames(JSON.parse(sgData));
      if (agData) setActiveGame(JSON.parse(agData));
      if (ogData) setOldGames(JSON.parse(ogData));
    } catch (error) {
      console.log(error);
    }
    // console.log({ players }, "players, from ContextStore");
    // console.log({ savedGames }, "saved games, from ContextStore");
    // console.table(oldGames);
  }, []);

  React.useEffect(() => {
    // console.log("context: setting values to localStorage: ");
    // console.log({ players });
    // console.log({ savedGames });
    // console.log({ activeGame });
    // console.log({ oldGames });

    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("saved-games", JSON.stringify(savedGames));
    localStorage.setItem("active-game", JSON.stringify(activeGame));
    localStorage.setItem("old-games", JSON.stringify(oldGames));
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CTX.Provider
        value={{
          players,
          setPlayers,
          savedGames,
          setSavedGames,
          activeGame,
          setActiveGame,
          oldGames,
          setOldGames,
        }}
      >
        {props.children}
      </CTX.Provider>
    </ThemeProvider>
  );
};
export default ContextStore;
