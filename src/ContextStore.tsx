import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { formatDateTime, UUID } from "./utils";

const appTheme = createMuiTheme({
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
  winner: Player | string | null;
  currentDealer?: string;
  currentHand?: number;
  currentLeader?: any;
  scores?: Array<any>;
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
  currentScore?: number;
  lastWin?: string;
  dealtLast?: boolean;
  isDealer?: boolean;
}
export interface Suit {
  name?: string;
  symbol?: string;
}

const defaultPlayers: Array<Player> = [
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
const defaultGames: Array<Game> = [
  {
    id: UUID(),
    dateTime: formatDateTime(),
    players: defaultPlayers,
    winner: null,
  },
];

const defaultActiveGame = {
  id: UUID(),
  dateTime: formatDateTime(),
  players: defaultPlayers,
  winner: null,
};
interface ContextProps {
  players: Player[];
  setPlayers: (v: any) => void;
  oldGames: Game[];
  setOldGames: (v: any) => void;
  savedGames: Game[];
  setSavedGames: (v: any) => void; //| React.Dispatch<React.SetStateAction<any[]>>;
  activeGame: Game;
  setActiveGame: (v: any) => void;
}

export const CTX = React.createContext<ContextProps>(undefined!);

const ContextStore: React.FC<Props> = (props) => {
  const [players, setPlayers] = React.useState(defaultPlayers);
  const [savedGames, setSavedGames] = React.useState(defaultGames);
  const [oldGames, setOldGames] = React.useState(defaultGames);
  const [activeGame, setActiveGame] = React.useState(defaultActiveGame);
  React.useEffect(() => {
    const pData = localStorage.getItem("players");
    const sgData = localStorage.getItem("saved-games");
    const ogData = localStorage.getItem("old-games");
    const agData = localStorage.getItem("active-game");
    try {
      if (pData) setPlayers(JSON.parse(pData));
      if (sgData) setSavedGames(JSON.parse(sgData));
      if (ogData) setOldGames(JSON.parse(ogData));
      if (agData) setActiveGame(JSON.parse(agData));
    } catch (error) {
      console.log(error);
    }
    // console.table(players);
    // console.table(savedGames);
    // console.table(oldGames);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("saved-games", JSON.stringify(savedGames));
    localStorage.setItem("old-games", JSON.stringify(oldGames));
    localStorage.setItem("active-game", JSON.stringify(activeGame));
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CTX.Provider
        value={{
          players,
          setPlayers,
          oldGames,
          setOldGames,
          savedGames,
          setSavedGames,
          activeGame,
          setActiveGame,
        }}
      >
        {props.children}
      </CTX.Provider>
    </ThemeProvider>
  );
};
export default ContextStore;
