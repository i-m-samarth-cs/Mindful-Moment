import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';
import Button from './ui/button'; // Assuming this is a default export

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

  const formatAddress = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {formatAddress(address)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          icon={<LogOut size={16} />}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={handleConnect}
        icon={<Wallet size={16} />}
        disabled={!injectedConnector || isLoading}
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      {error && (
        <span className="text-xs text-red-500 ml-2">
          {error.message.includes('rejected')
            ? 'Connection rejected'
            : error.message || 'Failed to connect'}
        </span>
      )}
    </div>
  );
};

export default WalletConnect;
