import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { FlightCard } from '@/components/FlightCard';
import { BetSlip } from '@/components/BetSlip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMarkets } from '@/data/mockData';
import { FlightMarket } from '@/types/betting';

type SortOption = 'departure' | 'pool' | 'bettors';

const Markets = () => {
  const [selectedMarket, setSelectedMarket] = useState<FlightMarket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('departure');

  const filteredMarkets = mockMarkets
    .filter((market) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        market.flightNumber.toLowerCase().includes(query) ||
        market.airline.toLowerCase().includes(query) ||
        market.origin.toLowerCase().includes(query) ||
        market.destination.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'departure':
          return a.departureTime.getTime() - b.departureTime.getTime();
        case 'pool':
          return b.totalPool - a.totalPool;
        case 'bettors':
          return b.bettorCount - a.bettorCount;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen gradient-dark">
      <Header />

      <main className="container px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Flight Markets</h1>
          <p className="text-muted-foreground">
            Browse and bet on upcoming flights from around the world
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by flight, airline, or airport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card/60 border-border/50"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={sortBy === 'departure' ? 'secondary' : 'outline'}
              onClick={() => setSortBy('departure')}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Departure
            </Button>
            <Button
              variant={sortBy === 'pool' ? 'secondary' : 'outline'}
              onClick={() => setSortBy('pool')}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Pool Size
            </Button>
            <Button
              variant={sortBy === 'bettors' ? 'secondary' : 'outline'}
              onClick={() => setSortBy('bettors')}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Popular
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="outline" className="text-sm">
            {filteredMarkets.length} markets
          </Badge>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="text-xs"
            >
              Clear search
            </Button>
          )}
        </div>

        {/* Markets Grid */}
        {filteredMarkets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market, index) => (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FlightCard market={market} onBet={setSelectedMarket} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold mb-2">No markets found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or check back later for new flights
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </main>

      {/* Bet Slip Modal */}
      {selectedMarket && (
        <BetSlip market={selectedMarket} onClose={() => setSelectedMarket(null)} />
      )}
    </div>
  );
};

export default Markets;
