export function formatDateTime(date?: Date): string {
  const rightNow = date ?? new Date(Date.now());
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
export function UUID(): string {
  let result = "";
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function keyByNicknameReducer(acc: object, player: any): object {
  return { ...acc, [player.nickname]: player };
}

export function getKeyedPlayersObjectFromArray(array: Array<any>): object {
  return array.reduce(keyByNicknameReducer, {});
}

function keyByIdReducer(acc: object, game: any): object {
  return { ...acc, [game.id]: game };
}

export function getKeyedGamesObjectFromArray(array: Array<any>): object {
  return array.reduce(keyByIdReducer, {});
}

function sumReducer(acc: number, current: number): number {
  return acc + current;
}

export function sumScoresFromArray(array: Array<number>): number {
  return array.reduce(sumReducer, 0);
}
