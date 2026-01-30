import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWalletContext } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

export const WalletButton = () => {
  const { connected, address, balance, connect, disconnect, isConnecting } = useWalletContext();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: 'Address copied',
        description: 'Wallet address copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!connected) {
    return (
      <Button
        onClick={connect}
        disabled={isConnecting}
        className="gap-2 bg-primary hover:bg-primary/90 neon-glow"
      >
        <Wallet className="h-4 w-4" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
          <Wallet className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline">{truncateAddress(address!)}</span>
          <span className="sm:hidden">Wallet</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-card border-border">
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">Connected Wallet</p>
          <p className="text-sm font-mono truncate">{address}</p>
        </div>
        <DropdownMenuSeparator />
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">Balance</p>
          <p className="text-lg font-bold text-primary">{balance.toLocaleString()} ALEO</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="gap-2 cursor-pointer">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect} className="gap-2 cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
