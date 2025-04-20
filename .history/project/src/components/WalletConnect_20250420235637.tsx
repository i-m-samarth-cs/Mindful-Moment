import React, { useEffect, useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import Button from './ui/Button';

const WalletConnect: React.FC = () => {
  // State for wallet connection
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is available
  const isWalletAvailable = () => {
    return typeof window !== 'undefined' && window.ethereum !== undefined;
  };

  // Format wallet address for display
  const formatAddress = (addr: string) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isWalletAvailable()) {
        try {
          const accounts = await window.ethereum!.request({ 
            method: 'eth_accounts' 
          });
          
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (err) {
          console.error("Failed to check wallet connection:", err);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        setIsConnected(false);
        setAddress(null);
      } else {
        // Account changed
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    };

    if (isWalletAvailable()) {
      window.ethereum!.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (isWalletAvailable()) {
        window.ethereum!.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    if (!isWalletAvailable()) {
      setError("Please install MetaMask or another Ethereum wallet");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setError("No accounts found. Please create an account in your wallet.");
      }
    } catch (err: any) {
      console.error("Connection error:", err);
      if (err.code === 4001) { // User rejected request
        setError("Connection request rejected");
      } else {
        setError("Failed to connect. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect function (for UI only, doesn't actually disconnect MetaMask)
  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
  };

  // Show connected state with address
  if (isConnected && address) {
    return (
      <Button 
        variant="primary" 
        size="sm" 
        onClick={disconnectWallet}
        icon={<LogOut size={16} />}
      >
        {formatAddress(address)}
      </Button>
    );
  }

  // Show connect button
  return (
    <div className="relative">
      <Button
        variant="primary"
        size="sm"
        onClick={connectWallet}
        disabled={isConnecting || !isWalletAvailable()}
        icon={<Wallet size={16} />}
      >
        {isConnecting ? 'Connecting...' : 'Connect'}
      </Button>
      
      {error && (
        <div className="absolute mt-2 text-xs text-red-500 bg-white dark:bg-gray-800 p-2 rounded shadow-md z-50 w-48">
          {error}
        </div>
      )}
      
      {!isWalletAvailable() && !error && (
        <div className="absolute mt-2 text-xs text-red-500 bg-white dark:bg-gray-800 p-2 rounded shadow-md z-50 w-48">
          Please install MetaMask
        </div>
      )}
    </div>
  );
};

export default WalletConnect;