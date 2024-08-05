import Caver from 'caver-js';

const caver = new Caver(window.klaytn);

// Check if MetaMask is installed
if (typeof window.klaytn !== 'undefined') {
      try {
        const accounts = await window.klaytn.enable();
        const account = accounts[0];
        // Use this account for transactions
      } catch (error) {
        console.error("Failed to connect to Kaikas:", error);
      }
} else {
    // Fall back to your custom RPC provider if MetaMask is not available
    const caver = new Caver('https://api.baobab.klaytn.net:8651');
}

export default caver;
