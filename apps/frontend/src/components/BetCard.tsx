import { motion } from 'framer-motion';
import { Plane, ArrowRight, Clock, CheckCircle, XCircle, Coins } from 'lucide-react';
import { UserBet } from '@/types/betting';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BetCardProps {
  bet: UserBet;
  onClaim?: (bet: UserBet) => void;
}

const outcomeLabels = {
  ontime: 'On-Time',
  delayed: 'Delayed',
  cancelled: 'Cancelled',
};

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-warning/10 text-warning border-warning/20',
    icon: Clock,
  },
  won: {
    label: 'Won',
    color: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle,
  },
  lost: {
    label: 'Lost',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: XCircle,
  },
  claimable: {
    label: 'Claim Winnings',
    color: 'bg-primary/10 text-primary border-primary/20',
    icon: Coins,
  },
};

export const BetCard = ({ bet, onClaim }: BetCardProps) => {
  const config = statusConfig[bet.status];
  const StatusIcon = config.icon;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
    >
      <Card className={cn(
        'glass-card overflow-hidden transition-all',
        bet.status === 'claimable' && 'border-primary/50 neon-glow'
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            {/* Flight Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="h-4 w-4 text-primary" />
                <span className="font-bold">{bet.flightNumber}</span>
                <Badge variant="outline" className="text-xs">
                  {bet.airline}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>{bet.origin}</span>
                <ArrowRight className="h-3 w-3" />
                <span>{bet.destination}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Your prediction: </span>
                  <span className="font-medium">{outcomeLabels[bet.prediction]}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Stake: </span>
                  <span className="font-medium">{bet.amount} ALEO</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Odds: </span>
                  <span className="font-medium text-primary">{bet.odds}x</span>
                </div>
              </div>

              {bet.actualOutcome && (
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Actual outcome: </span>
                  <span className={cn(
                    'font-medium',
                    bet.actualOutcome === bet.prediction ? 'text-success' : 'text-destructive'
                  )} style={{ color: bet.actualOutcome === bet.prediction ? 'hsl(var(--success))' : undefined }}>
                    {outcomeLabels[bet.actualOutcome]}
                  </span>
                </div>
              )}
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col items-end gap-2">
              <Badge className={cn('gap-1', config.color)}>
                <StatusIcon className="h-3 w-3" />
                {config.label}
              </Badge>
              
              <p className="text-xs text-muted-foreground">
                {formatDate(bet.placedAt)}
              </p>

              {bet.status === 'pending' && (
                <p className="text-sm font-medium">
                  Potential: <span className="text-primary">{bet.potentialPayout} ALEO</span>
                </p>
              )}

              {bet.status === 'won' && (
                <p className="text-sm font-medium text-success" style={{ color: 'hsl(var(--success))' }}>
                  Won: {bet.potentialPayout} ALEO
                </p>
              )}

              {bet.status === 'lost' && (
                <p className="text-sm font-medium text-destructive">
                  Lost: {bet.amount} ALEO
                </p>
              )}

              {bet.status === 'claimable' && (
                <Button
                  size="sm"
                  onClick={() => onClaim?.(bet)}
                  className="neon-glow"
                >
                  Claim {bet.potentialPayout} ALEO
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
