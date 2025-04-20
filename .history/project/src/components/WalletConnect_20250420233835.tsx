import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';
import Button from './ui/Button';

const WalletConnect: React.FC = () => {
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

  const formatAddress = (addr?: string) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  if (isConnected && address) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => disconnect()}
        icon={<LogOut size={16} />}
      >
        {formatAddress(address)}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleConnect}
        disabled={!injectedConnector || isLoading}
        icon={<Wallet size={16} />}
      >
        {isLoading ? 'Connecting...' : 'Connect'}
      </Button>
      {error && (
        <div className="absolute mt-2 text-xs text-red-500 bg-white dark:bg-gray-800 p-2 rounded shadow-md">
          {error.message?.includes('rejected')
            ? 'Connection rejected'
            : 'Failed to connect'}
        </div>
      )}
    </>
  );
};

export default WalletConnect;