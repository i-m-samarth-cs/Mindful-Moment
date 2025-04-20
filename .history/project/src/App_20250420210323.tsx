// src/components/Web3Provider.tsx
import React from 'react';
import {
  WagmiConfig,
  createConfig,
  configureChains,
} from 'wagmi';
import { mainnet, polygon, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      options: {
        name: 'MetaMask',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
