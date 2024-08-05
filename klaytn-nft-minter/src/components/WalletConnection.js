import React, { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import Caver from 'caver-js';

function WalletConnection({ onAccountChange }) {
  const [provider, setProvider] = useState(null);
  const [caver, setCaver] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    try {
      let selectedProvider;

      // Check for Kaikas first
      if (typeof window.klaytn !== 'undefined') {
        selectedProvider = window.klaytn;
        console.log("Kaikas detected");
      } else if (typeof window.ethereum !== 'undefined') {
        // If Kaikas is not available, check for MetaMask/other Web3 wallets
        selectedProvider = window.ethereum;
        console.log("MetaMask or other Web3 wallet detected");
      } else {
        throw new Error("No Web3 wallet detected. Please install Kaikas or MetaMask.");
      }

      // Request account access
      await selectedProvider.request({ method: 'eth_requestAccounts' });

      const caverInstance = new Caver(selectedProvider);
      setProvider(selectedProvider);
      setCaver(caverInstance);

      const accounts = await caverInstance.klay.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        onAccountChange(accounts[0], caverInstance);
      }

      setConnectionStatus('connected');

      // Set up event listeners
      selectedProvider.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onAccountChange(accounts[0], caverInstance);
        } else {
          setAccount('');
          onAccountChange('', null);
        }
      });

      selectedProvider.on("networkChanged", (networkId) => {
        console.log("Network changed to:", networkId);
        // You can add logic here to handle network changes
      });

    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setConnectionStatus('error');
    }
  };

  useEffect(() => {
    if (provider && caver) {
      const checkConnection = async () => {
        try {
          const accounts = await caver.klay.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            onAccountChange(accounts[0], caver);
            setConnectionStatus('connected');
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      };

      checkConnection();
    }
  }, [provider, caver, onAccountChange]);

  const disconnectWallet = async () => {
    if (provider && provider.disconnect) {
      await provider.disconnect();
    }
    setProvider(null);
    setCaver(null);
    setAccount('');
    onAccountChange('', null);
    setConnectionStatus('disconnected');
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      {connectionStatus === 'connected' ? (
        <div>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
          <p>Note: This dApp prioritizes Kaikas for Klaytn interactions. Please ensure Kaikas is installed and set as your preferred wallet for Klaytn.</p>
        </div>
      )}
      {connectionStatus === 'error' && <p>Error connecting to wallet. Please ensure Kaikas is installed and try again.</p>}
    </div>
  );
}

export default WalletConnection;