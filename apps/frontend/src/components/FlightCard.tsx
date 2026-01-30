import { Clock, Users, Plane, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FlightMarket } from '@/types/betting';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FlightCardProps {
  market: FlightMarket;
  onBet: (market: FlightMarket) => void;
}

export const FlightCard = ({ market, onBet }: FlightCardProps) => {
  const timeUntilDeparture = () => {
    const diff = market.departureTime.getTime() - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTimeColor = () => {
    const diff = market.departureTime.getTime() - Date.now();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 1) return 'text-destructive';
    if (hours < 3) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-card overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{market.flightNumber}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {market.airline}
              </Badge>
            </div>
            
            {/* Route */}
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold">{market.origin}</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{market.destination}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 space-y-4">
            {/* Time & Bettors */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className={cn('h-4 w-4', getTimeColor())} />
                <span className={getTimeColor()}>{timeUntilDeparture()}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{market.bettorCount} bettors</span>
              </div>
            </div>

            {/* Odds Display */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">On-Time</p>
                <p className="text-lg font-bold text-success" style={{ color: 'hsl(var(--success))' }}>
                  {market.odds.ontime.toFixed(2)}x
                </p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Delayed</p>
                <p className="text-lg font-bold text-warning" style={{ color: 'hsl(var(--warning))' }}>
                  {market.odds.delayed.toFixed(2)}x
                </p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Cancelled</p>
                <p className="text-lg font-bold text-destructive">
                  {market.odds.cancelled.toFixed(2)}x
                </p>
              </div>
            </div>

            {/* Pool Size */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Pool</p>
                <p className="text-lg font-bold text-primary">{market.totalPool.toLocaleString()} ALEO</p>
              </div>
              <Button 
                onClick={() => onBet(market)}
                className="neon-glow"
              >
                Place Bet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
