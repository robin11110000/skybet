import { FlightMarket, UserBet, UserStats } from '@/types/betting';

const now = new Date();
const addHours = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000);

export const mockMarkets: FlightMarket[] = [
  {
    id: 'market-1',
    flightNumber: 'AA1234',
    airline: 'American Airlines',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: addHours(4),
    totalPool: 15420,
    odds: { ontime: 1.45, delayed: 2.80, cancelled: 12.50 },
    bettorCount: 127,
    status: 'open',
  },
  {
    id: 'market-2',
    flightNumber: 'UA789',
    airline: 'United Airlines',
    origin: 'ORD',
    destination: 'MIA',
    departureTime: addHours(2),
    totalPool: 8930,
    odds: { ontime: 1.65, delayed: 2.20, cancelled: 8.75 },
    bettorCount: 89,
    status: 'open',
  },
  {
    id: 'market-3',
    flightNumber: 'DL456',
    airline: 'Delta Airlines',
    origin: 'ATL',
    destination: 'SEA',
    departureTime: addHours(6),
    totalPool: 23100,
    odds: { ontime: 1.35, delayed: 3.10, cancelled: 15.00 },
    bettorCount: 203,
    status: 'open',
  },
  {
    id: 'market-4',
    flightNumber: 'SW2468',
    airline: 'Southwest Airlines',
    origin: 'DEN',
    destination: 'PHX',
    departureTime: addHours(1.5),
    totalPool: 5670,
    odds: { ontime: 1.55, delayed: 2.45, cancelled: 10.00 },
    bettorCount: 56,
    status: 'open',
  },
  {
    id: 'market-5',
    flightNumber: 'BA287',
    airline: 'British Airways',
    origin: 'LHR',
    destination: 'JFK',
    departureTime: addHours(8),
    totalPool: 42500,
    odds: { ontime: 1.40, delayed: 2.95, cancelled: 18.00 },
    bettorCount: 312,
    status: 'open',
  },
  {
    id: 'market-6',
    flightNumber: 'LH441',
    airline: 'Lufthansa',
    origin: 'FRA',
    destination: 'SFO',
    departureTime: addHours(12),
    totalPool: 31200,
    odds: { ontime: 1.50, delayed: 2.60, cancelled: 14.00 },
    bettorCount: 178,
    status: 'open',
  },
];

export const mockUserBets: UserBet[] = [
  {
    id: 'bet-1',
    marketId: 'market-1',
    flightNumber: 'AA1234',
    airline: 'American Airlines',
    origin: 'JFK',
    destination: 'LAX',
    prediction: 'delayed',
    amount: 100,
    odds: 2.80,
    potentialPayout: 280,
    placedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: 'bet-2',
    marketId: 'market-old-1',
    flightNumber: 'AF1892',
    airline: 'Air France',
    origin: 'CDG',
    destination: 'LAX',
    prediction: 'ontime',
    amount: 250,
    odds: 1.55,
    potentialPayout: 387.5,
    placedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    status: 'won',
    actualOutcome: 'ontime',
  },
  {
    id: 'bet-3',
    marketId: 'market-old-2',
    flightNumber: 'EK215',
    airline: 'Emirates',
    origin: 'DXB',
    destination: 'JFK',
    prediction: 'delayed',
    amount: 150,
    odds: 2.40,
    potentialPayout: 360,
    placedAt: new Date(now.getTime() - 48 * 60 * 60 * 1000),
    status: 'lost',
    actualOutcome: 'ontime',
  },
  {
    id: 'bet-4',
    marketId: 'market-old-3',
    flightNumber: 'QF11',
    airline: 'Qantas',
    origin: 'SYD',
    destination: 'LAX',
    prediction: 'ontime',
    amount: 500,
    odds: 1.40,
    potentialPayout: 700,
    placedAt: new Date(now.getTime() - 72 * 60 * 60 * 1000),
    status: 'claimable',
    actualOutcome: 'ontime',
  },
];

export const mockUserStats: UserStats = {
  totalBets: 24,
  totalStaked: 4250,
  totalWinnings: 5890,
  pendingBets: 3,
  claimableAmount: 700,
  winRate: 0.625,
};

export const getMarketById = (id: string): FlightMarket | undefined => {
  return mockMarkets.find(market => market.id === id);
};

export const getActiveBets = (): UserBet[] => {
  return mockUserBets.filter(bet => bet.status === 'pending');
};

export const getClaimableBets = (): UserBet[] => {
  return mockUserBets.filter(bet => bet.status === 'claimable');
};

export const getBetHistory = (): UserBet[] => {
  return mockUserBets.filter(bet => bet.status === 'won' || bet.status === 'lost');
};
