import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Button from './ui/Button';
import { Wallet, LogOut } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [hasWallet, setHasWallet] = useState<boolean>(true);

  // Check if a wallet is installed
  useEffect(() => {
    const checkWallet = () => {
      if (!window.ethereum) {
        setHasWallet(false);
      } else {
        setHasWallet(true);
      }
    };
    checkWallet();
    // Listen for wallet changes (e.g., MetaMask extension installed)
    window.addEventListener('ethereum#initialized', checkWallet, { once: true });
    return () => window.removeEventListener('ethereum#initialized', checkWallet);
  }, []);

  // Find injected connector (e.g., MetaMask)
  const injectedConnector = connectors.find(
    (connector) => connector.id === 'injected'
  );

  // Format address for display
  const formatAddress = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  // Handle connect button click
  const handleConnect = () => {
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

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
      {hasWallet ? (
        <Button
          onClick={handleConnect}
          icon={<Wallet size={16} />}
          disabled={!injectedConnector || isLoading}
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open('https://metamask.io/download/', '_blank')}
        >
          Install Wallet
        </Button>
      )}

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