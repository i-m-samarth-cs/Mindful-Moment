import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';
import Button from './ui/button'; // Assuming this is a default export

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, error } = useConnect();
  const { disconnect } = useDisconnect();

  const injectedConnector = connectors.find(
    (connector) => connector.id === 'injected'
  );

  const handleConnect = () => {
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  const formatAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  if (isConnected && address) {
    return (
      <Button
        className="flex items-center gap-2 py-2"
        onClick={() => disconnect()}
        variant="outline"
      >
        <span>{formatAddress(address)}</span>
        <LogOut className="h-4 w-4" />
        <span>Disconnect</span>
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        className="flex items-center gap-2 py-2"
        onClick={handleConnect}
        disabled={!injectedConnector || isLoading}
        variant="outline"
      >
        <Wallet className="h-4 w-4" />
        <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
      </Button>
      {error && (
        <p className="text-sm text-red-500">
          {error.message?.includes('rejected')
            ? 'Connection rejected'
            : error.message || 'Failed to connect'}
        </p>
      )}
    </div>
  );
};

export default WalletConnect;