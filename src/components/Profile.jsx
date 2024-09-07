import React, { useState, useEffect } from 'react';
import { fetchMintedNFTs } from '../utils/nftUtils';

const Profile = ({ activeWallet, newMintedNFT }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNFTs = async () => {
    if (activeWallet) {
      try {
        setLoading(true);
        setError(null);
        console.log("Active wallet:", activeWallet);
        const mintedNFTs = await fetchMintedNFTs(activeWallet);
        setNfts(mintedNFTs);
      } catch (err) {
        console.error("Error loading NFTs:", err);
        setError(err.message || 'An error occurred while fetching NFTs');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('No active wallet detected');
    }
  };

  useEffect(() => {
    loadNFTs();
  }, [activeWallet, newMintedNFT]);

  const handleRefresh = () => {
    loadNFTs();
  };

  if (loading) {
    return <div className="text-center text-gray-600 my-8">Loading your NFTs... Please check the console for progress.</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 my-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Minted NFTs</h2>
        <button onClick={handleRefresh} className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
          Refresh NFTs
        </button>
      </div>
      {nfts.length === 0 ? (
        <p className="text-gray-600 text-center">No NFTs found for this wallet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{nft.name}</h3>
                <p className="text-gray-600 text-sm">{nft.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;