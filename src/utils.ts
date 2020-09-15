import { Player } from "./ContextStore";

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
export function getDateTimeElements(date: string) {
  let strArr = date.slice().split(",");
  return { day: strArr[0], date: strArr[1], time: strArr[2] };
}
export function UUID(): string {
  let result = "";
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
export function getRandomInitialDealer(max: number): number {
  let dealer = Math.floor(Math.random() * max);
  // console.log({ dealer });
  return dealer;
}

// let remainder = hands.length % players.length;

// if (previousDealer) {
// }
export function getDealerForHands(hands: number[], players: Player[]) {
  const names: string[] = players.map((player: Player) => player?.nickname);
  const dealers: string[] = [];

  for (let i = 0; i < hands.length; i++) {
    for (let j = 0; j < names.length; j++) {
      dealers.push(names[j]);
      console.log({ dealers });
      i = i + 1;
    }
    console.log(`i:${i}, hands.length:${hands.length}`);
  }
  return dealers;
}

function keyByNicknameReducer(acc: object, player: any): object {
  return { ...acc, [player.nickname]: true };
}

export function getKeyedNicknameObjectFromArray(array: Array<any>): object {
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
// function keyByNicknameReducer(acc: object, player: any): object {
//   return { ...acc, [player.nickname]: player };
// }
