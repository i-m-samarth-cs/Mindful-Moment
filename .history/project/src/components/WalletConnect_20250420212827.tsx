import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Wallet, LogOut } from 'lucide-react';
//import { Button } from './ui/button'; // adjust this import if needed
import { Button } from './ui/button'; // Ensure this import path matches the actual location of Button.tsx

const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [hasWallet, setHasWallet] = useState(true);
  const [injectedConnector, setInjectedConnector] = useState<any>(null);

  // Detect if wallet is installed and get the injected connector
  useEffect(() => {
    const checkWallet = () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        const injected = connectors.find(
          (connector) => connector.id === 'injected'
        );
        if (injected) {
          setHasWallet(true);
          setInjectedConnector(injected);
        } else {
          setHasWallet(false);
        }
      } else {
        setHasWallet(false);
      }
    };

    checkWallet();
    window.addEventListener('ethereum#initialized', checkWallet, { once: true });

    return () => {
      window.removeEventListener('ethereum#initialized', checkWallet);
    };
  }, [connectors]);

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
