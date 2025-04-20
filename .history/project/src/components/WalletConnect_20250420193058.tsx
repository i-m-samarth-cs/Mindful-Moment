import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Button from './ui/Button';
import { Wallet, LogOut } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector, error } = useConnect();
  const { disconnect } = useDisconnect();

  const injectedConnector = connectors.find(
    (connector) => connector.id === 'injected'
  );

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {address?.slice(0, 6)}...{address?.slice(-4)}
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
        onClick={() => connect({ connector: injectedConnector })}
        icon={<Wallet size={16} />}
        disabled={!injectedConnector || isLoading}
      >
        {isLoading && pendingConnector?.id === injectedConnector?.id
          ? 'Connecting...'
          : 'Connect Wallet'}
      </Button>

      {error && (
        <span className="text-xs text-red-500 ml-2">
          {error.message || 'Failed to connect'}
        </span>
      )}
    </div>
  );
};

export default WalletConnect;
