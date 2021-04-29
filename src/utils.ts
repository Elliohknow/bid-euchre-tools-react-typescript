import { Player } from './ContextStore'

function createData(numPlayers: number) {
  const arr: Array<string> = []
  for (let i = 0; i < numPlayers; i++) {
    // arr.push('0')
    arr[i] = '0'
  }
  return arr
}
  // if (numPlayers < 3) {
  //   return ['0', '0']
  // } else {
  //   return ['0', '0', '0']
  // }

export function createRows(numPlayers: number) {
  return [
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
    createData(numPlayers),
  ]
}

export function formatDateTime(date?: Date): string {
  const rightNow = date ?? new Date(Date.now())
  return rightNow.toLocaleString([], {
    weekday: 'short',
    month: 'numeric',
    year: 'numeric',
    day: 'numeric',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  })
}
export function getDateTimeElements(date: string) {
  let strArr = date.slice().split(',')
  return {day: strArr[0], date: strArr[1], time: strArr[2]}
}
export function getRandomInitialDealer(max: number): number {
  let dealer = Math.floor(Math.random() * max)
  // console.log({ dealer });
  return dealer
}

export function getDealingOrder(hands: number[], players: Player[], startingIndex?: number) {
  const names: string[] = players.map((player: Player) => player?.nickname)
  // console.log({ names });
  const dealers: string[] = []
  let k = startingIndex || 0
  while (dealers?.length < hands.length) {
    for (let i = k; i < names.length; i++) {
      dealers.push(names[i])
    }
    k = 0
  }
  // console.log({ dealers });
  return dealers
}

function sumReducer(acc: number, current: number): number {
  return acc + current
}

export function sumScoresFromArray(array: Array<number>): number {
  return array.reduce(sumReducer, 0)
}
// export function UUID(): string {
//   let result = ''
//   const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
//   for (let i = 0; i < 16; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length))
//   }
//   return result
// }

// function singleArrayFrom2DArrayReducer(acc: object, scoreArray:any[]) {
//   for (let i = 0; i < scoreArray?.length;i++){

//   }
//   return {...acc, score}
// }

// export function getSingleArrayFrom2DArray(array: Array<any>) {
//   return array.reduce(singleArrayFrom2DArrayReducer, {})
// }

// export function getKeyedNicknameObjectFromArray(array: Array<any>): object {
//   return array.reduce(keyByNicknameReducer, {});
// }

// function keyByIdReducer(acc: object, game: any): object {
//   return { ...acc, [game.id]: game };
// }

// export function getKeyedGamesObjectFromArray(array: Array<any>): object {
//   return array.reduce(keyByIdReducer, {});
// }

// function keyByNicknameReducer(acc: object, player: any): object {
//   return { ...acc, [player.nickname]: player };
// }
