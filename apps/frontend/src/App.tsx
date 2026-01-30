import { AleoWalletProvider } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui';
import { PuzzleWalletAdapter } from '@demox-labs/aleo-wallet-adapter-puzzle';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { ShieldWalletAdapter } from '@demox-labs/aleo-wallet-adapter-shield';
import { FoxWalletAdapter } from '@demox-labs/aleo-wallet-adapter-fox';
import { Network } from '@demox-labs/aleo-types';
import { DecryptPermission } from '@demox-labs/aleo-wallet-adapter-core';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import Index from "./pages/Index";
import Markets from "./pages/Markets";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  // Access all wallet state and methods
  const {
    connected,        // boolean - whether wallet is connected
    connecting,       // boolean - whether wallet is connecting
    disconnecting,    // boolean - whether wallet is disconnecting
    reconnecting,    // boolean - whether wallet is reconnecting
    address,          // string | null - connected wallet address
    network,          // Network | null - current network
    wallet,           // Wallet | null - connected wallet adapter
    autoConnect,      // boolean - autoConnect setting
    switchNetwork,    // (network: Network) => Promise<boolean>
    disconnect,       // () => Promise<void>
  } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Wallet Connection Status */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">✈️ Flight Betting</h1>
          <div className="flex items-center gap-4">
            <WalletMultiButton />
            {connected && address && (
              <div className="text-sm">
                <span className="text-green-600">✅ {address.slice(0, 10)}...</span>
                {network && <span className="text-gray-600"> • {network}</span>}
              </div>
            )}
            {connecting && <span className="text-yellow-600">🔄 Connecting...</span>}
          </div>
        </div>

        {/* Main App Content */}
        <div className="container mx-auto px-4 py-8">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AleoWalletProvider
      wallets={[
        new ShieldWalletAdapter(),
        new PuzzleWalletAdapter(),
        new LeoWalletAdapter(),
        new FoxWalletAdapter(),
      ]}
      autoConnect={true}
      network={Network.TESTNET}
      decryptPermission={DecryptPermission.UponRequest}
      programs={["flight_betting.aleo"]}
      onError={error => console.error(error.message)}
    >
      <WalletModalProvider>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <AppContent />
          </QueryClientProvider>
        </TooltipProvider>
      </WalletModalProvider>
    </AleoWalletProvider>
  );
}
