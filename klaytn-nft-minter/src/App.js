import React, { useState } from 'react';
import NFTMinter from './components/NFTMinter';
import WalletConnection from './components/WalletConnection';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(null);

  const handleAccountChange = (newAccount, newSigner) => {
    setAccount(newAccount);
    setSigner(newSigner); // Store the signer along with the account
  };

  return (
    <div className="App">
      <header>
        <h1>Klaytn NFT Minter</h1>
      </header>
      <main>
        <WalletConnection onAccountChange={handleAccountChange} />
        {account ? (
          <NFTMinter account={account} signer={signer} /> // Pass both account and signer to NFTMinter
        ) : (
          <p>Please connect your wallet to start minting NFTs.</p>
        )}
      </main>
    </div>
  );
}

export default App;
