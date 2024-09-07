import React, { useState, useEffect } from 'react';
import { Navbar, Home, NFTMinter, Profile, Footer, Docs, Tutorial, Contact } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [activeWallet, setActiveWallet] = useState(null);

  useEffect(() => {
    const getWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Connected wallet:", accounts[0]);
          setActiveWallet(accounts[0]);
        } catch (error) {
          console.error("Failed to get wallet address", error);
        }
      } else {
        console.log("Ethereum object not found, do you have MetaMask installed?");
      }
    };

    getWalletAddress();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mint" element={<NFTMinter />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={activeWallet ? <Profile activeWallet={activeWallet} /> : <div>Please connect your wallet</div>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;