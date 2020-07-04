export type Game = {
  id: string;
  dateTime: string;
  numPlayers: number;
  players: object;
};
const getDateTime = () => {
  const rightNow = new Date(Date.now());
  return rightNow.toLocaleString([], {
    weekday: "short",
    month: "numeric",
    year: "numeric",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};
// let getPromise = () => {
//   return new Promise((resolve) => setTimeout(resolve, 0));
// }
function getTotalGamesPlayed() {
  let total = localStorage.getItem("total_games_played") ?? "0";
  return parseInt(total);
}
function setTotalGamesPlayed(total: number) {
  try {
    localStorage.setItem("total_games_played", total.toString());
  } catch {
    throw new Error('Could not set item "total_games_played" to localStorage!');
  }
}
function incrementTotalGamesPlayed() {
  let total = getTotalGamesPlayed();
  setTotalGamesPlayed(total + 1);
  return total + 1;
}
export const saveNewGame = (numPlayers: number, players: object) => {
  const gameId = incrementTotalGamesPlayed();
  const dateTime = getDateTime();
  const newGame: Game = {
    id: `rubber_${gameId}`,
    dateTime: dateTime,
    numPlayers: numPlayers,
    players: players,
  };
  try {
    localStorage.setItem(`rubber_${gameId}`, JSON.stringify(newGame));
  } catch {
    throw new Error(`Could not set new item "rubber_${gameId}" to localStorage!`);
  }
  return true;
};
export const saveCurrentGame = (game: Game) => {
  try {
    localStorage.setItem(`rubber_${game.id}`, JSON.stringify(game));
  } catch {
    throw new Error(`Could not set item "rubber_${game.id}" to localStorage!`);
  }
  return true;
};
export const loadSavedGame = (id: string) => {
  let game = localStorage.getItem(id) ?? "$#!%";
  if (game === "$#!%") throw new Error(game);
  else return JSON.parse(game);
};

// .catch (err => { throw new Error('High level error' + err.message) })
// .catch (err => console.log(err));

// let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(weekday); // this gimmicky shit doesn't work
// let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Say'];
// let day = days[rightNow.getDay()]
// let date = rightNow.toLocaleDateString();
// let time = rightNow.toLocaleTimeString([], { hour12: true, hour: "2-digit", minute: "2-digit" });
