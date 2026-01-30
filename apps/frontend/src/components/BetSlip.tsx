import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { FlightMarket, BetOutcome } from '@/types/betting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useWalletContext } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BetSlipProps {
  market: FlightMarket | null;
  onClose: () => void;
}

const outcomeConfig = {
  ontime: {
    label: 'On-Time',
    color: 'bg-success text-success-foreground',
    borderColor: 'border-success',
    description: 'Flight arrives within 15 minutes of schedule',
  },
  delayed: {
    label: 'Delayed',
    color: 'bg-warning text-warning-foreground',
    borderColor: 'border-warning',
    description: 'Flight arrives 15+ minutes late',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-destructive text-destructive-foreground',
    borderColor: 'border-destructive',
    description: 'Flight is cancelled entirely',
  },
};

export const BetSlip = ({ market, onClose }: BetSlipProps) => {
  const [selectedOutcome, setSelectedOutcome] = useState<BetOutcome | null>(null);
  const [betAmount, setBetAmount] = useState<number>(50);
  const [isPlacing, setIsPlacing] = useState(false);
  const { connected, balance, connect } = useWalletContext();
  const { toast } = useToast();

  if (!market) return null;

  const currentOdds = selectedOutcome ? market.odds[selectedOutcome] : 0;
  const potentialPayout = betAmount * currentOdds;

  const handlePlaceBet = async () => {
    if (!connected) {
      connect();
      return;
    }

    if (!selectedOutcome) {
      toast({
        title: 'Select an outcome',
        description: 'Please choose what you think will happen to this flight',
        variant: 'destructive',
      });
      return;
    }

    if (betAmount > balance) {
      toast({
        title: 'Insufficient balance',
        description: 'You don\'t have enough ALEO to place this bet',
        variant: 'destructive',
      });
      return;
    }

    setIsPlacing(true);

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: '🎉 Bet Placed Successfully!',
      description: `You bet ${betAmount} ALEO on ${market.flightNumber} being ${outcomeConfig[selectedOutcome].label.toLowerCase()}`,
    });

    setIsPlacing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md glass-card p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="h-5 w-5 text-primary" />
              <span className="font-bold text-xl">{market.flightNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-semibold">{market.origin}</span>
              <ArrowRight className="h-4 w-4" />
              <span className="font-semibold">{market.destination}</span>
            </div>
          </div>

          {/* Outcome Selection */}
          <div className="mb-6">
            <Label className="text-sm text-muted-foreground mb-3 block">
              Select Your Prediction
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(outcomeConfig) as BetOutcome[]).map((outcome) => {
                const config = outcomeConfig[outcome];
                const isSelected = selectedOutcome === outcome;
                const odds = market.odds[outcome];

                return (
                  <button
                    key={outcome}
                    onClick={() => setSelectedOutcome(outcome)}
                    className={cn(
                      'p-3 rounded-lg border-2 transition-all',
                      isSelected
                        ? `${config.borderColor} ${config.color}`
                        : 'border-border bg-secondary/50 hover:border-primary/50'
                    )}
                  >
                    <p className="font-medium text-sm">{config.label}</p>
                    <p className={cn(
                      'text-lg font-bold',
                      !isSelected && 'text-primary'
                    )}>
                      {odds.toFixed(2)}x
                    </p>
                  </button>
                );
              })}
            </div>
            {selectedOutcome && (
              <p className="text-xs text-muted-foreground mt-2">
                {outcomeConfig[selectedOutcome].description}
              </p>
            )}
          </div>

          {/* Bet Amount */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm text-muted-foreground">Bet Amount</Label>
              {connected && (
                <span className="text-xs text-muted-foreground">
                  Balance: {balance.toLocaleString()} ALEO
                </span>
              )}
            </div>
            <div className="flex gap-3 mb-3">
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                min={1}
                max={connected ? balance : 10000}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBetAmount(Math.floor(balance / 2))}
                disabled={!connected}
              >
                50%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBetAmount(Math.floor(balance))}
                disabled={!connected}
              >
                Max
              </Button>
            </div>
            <Slider
              value={[betAmount]}
              onValueChange={(value) => setBetAmount(value[0])}
              max={connected ? balance : 1000}
              min={1}
              step={1}
              className="mb-2"
            />
          </div>

          {/* Payout Preview */}
          {selectedOutcome && (
            <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Your Stake</span>
                <span className="font-medium">{betAmount} ALEO</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Odds</span>
                <span className="font-medium text-primary">{currentOdds.toFixed(2)}x</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Potential Payout</span>
                <span className="text-xl font-bold text-primary neon-text">
                  {potentialPayout.toFixed(2)} ALEO
                </span>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--warning))' }} />
            <p className="text-xs text-muted-foreground">
              Bets are final and processed via zero-knowledge proofs on Aleo testnet. Your prediction remains private.
            </p>
          </div>

          {/* Place Bet Button */}
          <Button
            onClick={handlePlaceBet}
            disabled={isPlacing || (!connected && false)}
            className="w-full h-12 text-lg font-semibold neon-glow"
          >
            {isPlacing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Processing on Aleo...
              </>
            ) : !connected ? (
              'Connect Wallet to Bet'
            ) : (
              `Place Bet - ${betAmount} ALEO`
            )}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
