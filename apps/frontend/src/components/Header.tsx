import { Link, useLocation } from 'react-router-dom';
import { Plane, LayoutDashboard, TrendingUp, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletButton } from '@/components/WalletButton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Plane },
  { path: '/markets', label: 'Markets', icon: TrendingUp },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Plane className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Flight<span className="text-primary">Bet</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'gap-2 transition-all',
                    isActive && 'bg-secondary neon-glow'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Wallet & Network */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" style={{ backgroundColor: 'hsl(var(--success))' }} />
            <span className="text-xs font-medium text-muted-foreground">Testnet</span>
          </div>
          
          <WalletButton />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-card border-border">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        className="w-full justify-start gap-3"
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
