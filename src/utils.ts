// import { Game } from "./interfaces";

export function formatDateTime(): string {
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
}
const _characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export function UUID(): string {
  let result: string = "";
  const chars = _characters.slice();
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// function getTotalGamesPlayed() {
//   let total = getCookieItem("total_games_played") ?? "0";
//   return parseInt(total);
// }
// function setTotalGamesPlayed(total: number) {
//   setCookieItem("total_games_played", total.toString());
// }
// function incrementTotalGamesPlayed() {
//   let total = getTotalGamesPlayed();
//   let newTotal = total + 1;
//   setTotalGamesPlayed(newTotal);
//   return newTotal;
// }
// export const saveNewGame = (numPlayers: number, players: object) => {
//   const gameId = incrementTotalGamesPlayed();
//   const dateTime = getDateTime();
//   const newGame: Game = {
//     id: `game_${gameId}`,
//     dateTime: dateTime,
//     numPlayers: numPlayers,
//     players: players,
//     complete: false,
//   };
//   setCookieItem(`game_${gameId}`, JSON.stringify(newGame));
// };
// export const saveCurrentGame = (game: Game) => {
//   setCookieItem(`game_${game.id}`, JSON.stringify(game));
// };
// export const loadSavedGame = (id: string) => {
//   let game = getCookieItem(id) ?? "$#!%";
//   if (game === "$#!%") throw new Error(game);
//   else return JSON.parse(game);
// };
