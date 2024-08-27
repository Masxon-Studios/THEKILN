import React from 'react';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

// Define Klaytn chain
const klaytnChain = {
  id: 8217, // Mainnet chain ID for Klaytn
  name: 'Klaytn Mainnet',
  network: 'klaytn',
  nativeCurrency: {
    decimals: 18,
    name: 'KLAY',
    symbol: 'KLAY',
  },
  rpcUrls: {
    default: 'https://public-en-cypress.klaytn.net', // Public RPC URL for Klaytn
  },
  blockExplorers: {
    default: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
  },
  testnet: false,
};

const { chains, provider, webSocketProvider } = configureChains(
  [klaytnChain], // Use only Klaytn chain
  [publicProvider()] // Use public provider for Klaytn
);

const { connectors } = getDefaultWallets({
  appName: 'MASXON',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const RainbowAppWrapper = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: 'black',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowAppWrapper;