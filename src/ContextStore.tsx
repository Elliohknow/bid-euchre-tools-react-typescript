import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { createContext, useEffect, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { formatDateTime, getDealingOrder, getRandomInitialDealer } from './utils'

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      dark: '#004346',
      main: '#006064',
      light: '#337f83',
      contrastText: '#ffffff',
    },
    secondary: {
      dark: '#790e3c',
      main: '#ad1457',
      light: '#bd4378',
      contrastText: '#ffffff',
    },
  },
})

export interface Props {
  children: React.ReactNode
}
export interface Game {
  id: string
  dateTime: string
  players: Array<Player>
  winner?: any
  numHands: number
  hands: number[]
  dealers: string[]
  currentHand: number
  currentDealer: number
  currentLeader?: any
  currentBid?: Bid
  bids: Bid[]
  data?: any
}
export interface Player {
  id: string
  nickname: string
  currentScore?: number
  hands?: any
  stats?: PlayerStats
}
export interface PlayerStats {
  gamesPlayed?: number
  wins?: number
  losses?: number
  totalBidsTaken?: number
  favoredSuit?: Suit
  lastWin?: string
  callCount?: number
  upRiverCount?: number
}
export interface Suit {
  value: string
  label: string
}
export interface Bid {
  amount: number | string
  suit: Suit
  player: Player
  row: number
  call?: boolean
  callAmount?: number
}
export interface ScoreOption {
  value: number
  label: string
}
//"♠ ♥ ♦ ♣ ⚖"
export const suits: Suit[] = [
  {
    value: 'Spades',
    label: '♠',
  },
  {
    value: 'Hearts',
    label: '♥',
  },
  {
    value: 'Diamonds',
    label: '♦',
  },
  {
    value: 'Clubs',
    label: '♣',
  },
  {
    value: 'No trump',
    label: '⚖',
  },
]

export const scoreOptions: ScoreOption[] = [
  { value: 0, label: '-' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 12, label: 'Call (12)' },
  { value: 18, label: 'Call (18)' },
  { value: 24, label: 'ShM (24)' },
]

export const defaultPlayers: Array<Player> = [
  {
    id: 'player_1',
    nickname: 'Pat',
    hands: [],
  },
  {
    id: 'player_2',
    nickname: 'Elliott',
    hands: [],
  },
  {
    id: 'player_3',
    nickname: 'Liz',
    hands: [],
  },
]

export const defaultHands: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
export const defaultDealer: number = getRandomInitialDealer(defaultPlayers.length)
export const defaultDealers: string[] = getDealingOrder(defaultHands, defaultPlayers, defaultDealer)
const defaultGames: Array<Game> = [
  {
    id: uuidV4(),
    dateTime: formatDateTime(),
    players: defaultPlayers,
    numHands: 8,
    hands: defaultHands,
    currentHand: 1,
    currentDealer: defaultDealer,
    dealers: defaultDealers,
    bids: [],
  },
]
export const defaultActiveGame: Game = {
  id: uuidV4(),
  dateTime: formatDateTime(),
  players: defaultPlayers,
  numHands: 8,
  hands: defaultHands,
  currentHand: 1,
  currentDealer: defaultDealer,
  dealers: defaultDealers,
  bids: [],
}

interface ContextProps {
  players: Player[]
  setPlayers: (v: any) => void
  savedGames: Game[]
  setSavedGames: (v: any) => void
  activeGame: Game
  setActiveGame: (v: any) => void
}

export const CTX = createContext<ContextProps>(undefined!)

const ContextStore: React.FC<Props> = props => {
  const [players, setPlayers] = useState(defaultPlayers)
  const [savedGames, setSavedGames] = useState(defaultGames)
  const [activeGame, setActiveGame] = useState(defaultActiveGame)

  useEffect(() => {
    const pData = localStorage.getItem('players')
    const sgData = localStorage.getItem('saved-games')
    const agData = localStorage.getItem('active-game')
    try {
      if (pData) setPlayers(JSON.parse(pData))
      if (sgData) setSavedGames(JSON.parse(sgData))
      if (agData) setActiveGame(JSON.parse(agData))
    } catch (error) {
      console.log(error)
    }
    // console.log({ players }, "players, from ContextStore");
    // console.log({ savedGames }, "saved games, from ContextStore");
  }, [])

  useEffect(() => {
    // console.log("context: setting values to localStorage: ");
    localStorage.setItem('players', JSON.stringify(players))
    localStorage.setItem('saved-games', JSON.stringify(savedGames))
    localStorage.setItem('active-game', JSON.stringify(activeGame))
  })

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
        }}
      >
        {props.children}
      </CTX.Provider>
    </ThemeProvider>
  )
}
export default ContextStore
