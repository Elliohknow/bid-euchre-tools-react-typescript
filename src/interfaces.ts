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
export type PlayerList = Player[];
// export type PlayerList = () => Player[];
export interface Game {
  id: string;
  dateTime: string | Date;
  numPlayers: number;
  players: PlayerList;
  complete: boolean;
  winner?: Player;
}
export type GameList = Game[];
export interface Suit {
  name?: string;
  symbol?: string;
}
export type SuitList = Suit[];
