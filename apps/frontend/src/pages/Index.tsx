import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plane, ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { FlightCard } from '@/components/FlightCard';
import { BetSlip } from '@/components/BetSlip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWalletContext } from '@/contexts/WalletContext';
import { mockMarkets } from '@/data/mockData';
import { FlightMarket } from '@/types/betting';

const Index = () => {
  const [selectedMarket, setSelectedMarket] = useState<FlightMarket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { connected, address } = useWalletContext();

  const featuredMarkets = mockMarkets.slice(0, 3);

  return (
    <div className="min-h-screen gradient-dark">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Zero-Knowledge Flight Predictions</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Bet on Flights with
              <span className="block text-primary neon-text">Complete Privacy</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Predict flight delays and cancellations on the Aleo blockchain. 
              Your bets remain private with zero-knowledge proofs.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search flights (e.g., AA1234)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-card/60 backdrop-blur border-border/50"
                />
              </div>
              <Button size="lg" className="h-12 px-8 neon-glow">
                <Plane className="h-5 w-5 mr-2" />
                Find Markets
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">127K+</p>
                <p className="text-sm text-muted-foreground">Total Bets Placed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">2.1M</p>
                <p className="text-sm text-muted-foreground">ALEO in Pools</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">8,432</p>
                <p className="text-sm text-muted-foreground">Active Bettors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: 'Private Predictions',
              description: 'Your bets are encrypted using zero-knowledge proofs. Nobody knows what you predicted.',
            },
            {
              icon: TrendingUp,
              title: 'Dynamic Odds',
              description: 'Odds update in real-time based on pool distribution and flight data.',
            },
            {
              icon: Plane,
              title: 'Global Flights',
              description: 'Bet on thousands of flights from major airlines worldwide.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Markets */}
      <section className="container px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Markets</h2>
            <p className="text-muted-foreground">Hot flight predictions closing soon</p>
          </div>
          <Link to="/markets">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMarkets.map((market, index) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FlightCard market={market} onBet={setSelectedMarket} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20">
        <div className="relative glass-card p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {connected ? 'Ready to Make Private Predictions?' : 'Connect Your Aleo Wallet'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {connected 
                ? `Start betting on flights with complete privacy using ${address?.slice(0, 6)}...`
                : 'Connect your Aleo wallet to start betting on flights with zero-knowledge proofs.'
              }
            </p>
            <Link to="/markets">
              <Button size="lg" className="neon-glow" disabled={!connected}>
                {connected ? 'Explore Markets' : 'Connect Wallet'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="font-bold">FlightBet</span>
              <span className="text-xs text-muted-foreground">on Aleo</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for Aleo Wave 1 • Zero-Knowledge Flight Predictions
            </p>
          </div>
        </div>
      </footer>

      {/* Bet Slip Modal */}
      {selectedMarket && (
        <BetSlip market={selectedMarket} onClose={() => setSelectedMarket(null)} />
      )}
    </div>
  );
};

export default Index;
