import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AleoWalletProvider } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui';
import { PuzzleWalletAdapter } from '@demox-labs/aleo-wallet-adapter-puzzle';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { ShieldWalletAdapter } from '@demox-labs/aleo-wallet-adapter-shield';
import { FoxWalletAdapter } from '@demox-labs/aleo-wallet-adapter-fox';
import { Network } from '@demox-labs/aleo-types';
import { DecryptPermission } from '@demox-labs/aleo-wallet-adapter-core';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';

interface WalletContextType {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Real Aleo wallet integration
export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Access all wallet state and methods from Aleo adapter
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
    <WalletContext.Provider
      value={{
        connected: connected || false,
        connecting: connecting || false,
        disconnecting: disconnecting || false,
        reconnecting: reconnecting || false,
        address: address || null,
        network: network || null,
        wallet: wallet || null,
        autoConnect: autoConnect || true,
        switchNetwork: switchNetwork || (() => Promise.resolve(false)),
        disconnect: disconnect || (() => Promise.resolve()),
        isConnecting: connecting || false,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};
