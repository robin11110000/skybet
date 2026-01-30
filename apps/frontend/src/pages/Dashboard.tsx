import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Clock, Trophy, History, Coins } from 'lucide-react';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { BetCard } from '@/components/BetCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWalletContext } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { mockUserStats, getActiveBets, getClaimableBets, getBetHistory } from '@/data/mockData';
import { UserBet } from '@/types/betting';

const Dashboard = () => {
  const { connected, connect, balance } = useWalletContext();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active');

  const activeBets = getActiveBets();
  const claimableBets = getClaimableBets();
  const betHistory = getBetHistory();

  const handleClaimWinnings = (bet: UserBet) => {
    toast({
      title: '🎉 Winnings Claimed!',
      description: `${bet.potentialPayout} ALEO has been added to your wallet`,
    });
  };

  const handleClaimAll = () => {
    const totalClaimable = claimableBets.reduce((sum, bet) => sum + bet.potentialPayout, 0);
    toast({
      title: '🎉 All Winnings Claimed!',
      description: `${totalClaimable} ALEO has been added to your wallet`,
    });
  };

  if (!connected) {
    return (
      <div className="min-h-screen gradient-dark">
        <Header />
        <main className="container px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="glass-card p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Connect your Aleo wallet to view your bets, track winnings, and manage your account.
              </p>
              <Button onClick={connect} size="lg" className="w-full neon-glow">
                Connect Wallet
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-dark">
      <Header />

      <main className="container px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your bets and manage your winnings
            </p>
          </div>
          {claimableBets.length > 0 && (
            <Button onClick={handleClaimAll} size="lg" className="neon-glow">
              <Coins className="h-5 w-5 mr-2" />
              Claim All ({mockUserStats.claimableAmount} ALEO)
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Wallet Balance"
            value={`${balance.toLocaleString()} ALEO`}
            icon={Wallet}
            variant="primary"
          />
          <StatsCard
            title="Total Staked"
            value={`${mockUserStats.totalStaked.toLocaleString()} ALEO`}
            subtitle={`${mockUserStats.pendingBets} active bets`}
            icon={TrendingUp}
          />
          <StatsCard
            title="Total Winnings"
            value={`${mockUserStats.totalWinnings.toLocaleString()} ALEO`}
            icon={Trophy}
            variant="success"
            trend="up"
            trendValue="+38.5%"
          />
          <StatsCard
            title="Win Rate"
            value={`${(mockUserStats.winRate * 100).toFixed(1)}%`}
            subtitle={`${mockUserStats.totalBets} total bets`}
            icon={History}
          />
        </div>

        {/* Claimable Banner */}
        {claimableBets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 mb-8 border-primary/50 neon-glow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">You have winnings to claim!</p>
                  <p className="text-sm text-muted-foreground">
                    {claimableBets.length} bet{claimableBets.length > 1 ? 's' : ''} ready to collect
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-primary neon-text">
                {mockUserStats.claimableAmount} ALEO
              </p>
            </div>
          </motion.div>
        )}

        {/* Bets Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active" className="gap-2">
              <Clock className="h-4 w-4" />
              Active ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="claimable" className="gap-2">
              <Coins className="h-4 w-4" />
              Claimable ({claimableBets.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              History ({betHistory.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeBets.length > 0 ? (
              activeBets.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BetCard bet={bet} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 glass-card">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Bets</h3>
                <p className="text-muted-foreground">
                  Head to the Markets page to place your first bet!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="claimable" className="space-y-4">
            {claimableBets.length > 0 ? (
              claimableBets.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BetCard bet={bet} onClaim={handleClaimWinnings} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 glass-card">
                <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Claimable Winnings</h3>
                <p className="text-muted-foreground">
                  Your winning bets will appear here once flights are resolved
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {betHistory.length > 0 ? (
              betHistory.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BetCard bet={bet} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 glass-card">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Bet History</h3>
                <p className="text-muted-foreground">
                  Your completed bets will be recorded here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
