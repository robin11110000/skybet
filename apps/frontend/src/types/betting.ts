export type BetOutcome = 'ontime' | 'delayed' | 'cancelled';

export type BetStatus = 'pending' | 'won' | 'lost' | 'claimable';

export interface FlightMarket {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: Date;
  totalPool: number;
  odds: {
    ontime: number;
    delayed: number;
    cancelled: number;
  };
  bettorCount: number;
  status: 'open' | 'closed' | 'resolved';
  resolvedOutcome?: BetOutcome;
}

export interface UserBet {
  id: string;
  marketId: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  prediction: BetOutcome;
  amount: number;
  odds: number;
  potentialPayout: number;
  placedAt: Date;
  status: BetStatus;
  actualOutcome?: BetOutcome;
}

export interface UserStats {
  totalBets: number;
  totalStaked: number;
  totalWinnings: number;
  pendingBets: number;
  claimableAmount: number;
  winRate: number;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  network: 'testnet' | 'mainnet';
}
