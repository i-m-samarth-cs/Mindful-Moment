// src/types/window.d.ts

interface Ethereum {
    isMetaMask?: boolean;
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, callback: (...args: any[]) => void) => void;
    removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    selectedAddress?: string;
    chainId?: string;
  }
  
  declare global {
    interface Window {
      ethereum?: Ethereum;
    }
  }
  
  export {};