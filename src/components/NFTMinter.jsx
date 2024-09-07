import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useAccount } from 'wagmi';
import contractABI from '../contractConfig'; // Ensure this points to the correct ABI file

const PINATA_GATEWAY = process.env.REACT_APP_PINATA_GATEWAY || "https://ivory-electronic-mollusk-196.mypinata.cloud";

function NFTMinter() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [metadataUrl, setMetadataUrl] = useState('');
  const [mintingFee, setMintingFee] = useState('0');
  const [imagePreview, setImagePreview] = useState(''); // State for image preview

  const { address } = useAccount();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          setSigner(signer);
        })
        .catch((err) => console.error('Error connecting to MetaMask', err));
    } else {
      setError('MetaMask is not installed. Please install it to use this app.');
    }
  }, []);

  const [signer, setSigner] = useState(null);

  const contract = signer ? new ethers.Contract('0x180B901B778ec228570596107023beb5501eD334', contractABI, signer) : null;

  const fetchMintingFee = async () => {
    try {
      if (contract) {
        const fee = await contract.klayFee();
        setMintingFee(fee.toString());
      }
    } catch (error) {
      console.error('Error retrieving minting fee:', error);
      setError('Could not retrieve minting fee');
    }
  };

  useEffect(() => {
    if (address && signer) {
      fetchMintingFee();
    }
  }, [address, signer]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate and set image preview URL
    } else {
      setImagePreview(''); // Clear preview if no file is selected
    }
  };

  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        description: description,
      },
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY,
        }
      });
      return `${PINATA_GATEWAY}/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading file to Pinata:', error);
      throw error;
    }
  };

  const createMetadata = async (imageUrl) => {
    const metadata = {
      name: name,
      description: description,
      image: imageUrl,
    };
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
        headers: {
          'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY,
        }
      });
      return `${PINATA_GATEWAY}/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading metadata to Pinata:', error);
      throw error;
    }
  };

  const handleMint = async () => {
    if (!address) {
      setError('Please connect your wallet first.');
      return;
    }
  
    if (!file || !name || !description) {
      setError('Please fill in all fields and upload an image.');
      return;
    }
  
    setMinting(true);
    setError('');
    setSuccess('');
  
    try {
      const imageUrl = await uploadToPinata(file);
      const metadataUrl = await createMetadata(imageUrl);
      setMetadataUrl(metadataUrl);
  
      if (contract) {
        const tx = await contract.mintNFT(address, metadataUrl, {
          value: mintingFee,
          gasLimit: 300000,
          gasPrice: ethers.utils.parseUnits('250', 'gwei'),
        });
  
        await tx.wait();
  
        setSuccess('NFT minted successfully!');
        setFile(null);
        setName('');
        setDescription('');
        setImagePreview(''); // Clear the image preview after minting
      } else {
        setError('Contract not initialized properly');
      }
    } catch (err) {
      console.error('Error minting NFT:', err);
      setError('Error minting NFT: ' + err.message);
    } finally {
      setMinting(false);
    }
  };
 
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] w-full lg:-mt-10 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-4xl font-bold text-slate-800 mb-6 text-center">Mint Your NFT</h2>
      <form className="w-full max-w-md">
        <div className="mb-6">
          <label className="block text-slate-700 text-lg font-medium mb-2">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        {imagePreview && (
          <div className="mb-6">
            <img src={imagePreview} alt="NFT Preview" className="w-full h-auto rounded-md mb-4" />
          </div>
        )}
        <div className="mb-6">
          <label className="block text-slate-700 text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Enter NFT name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-700 text-lg font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Enter NFT description"
            rows="4"
          />
        </div>
        <button
          type="button"
          onClick={handleMint}
          disabled={minting || !file || !name || !description}
          className="w-full px-6 py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          {minting ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {success && <div className="mt-4 text-green-500">{success}</div>}
    </div>
  );
}

export default NFTMinter;
