import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Caver from 'caver-js';
import contract from '../contractConfig';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

const PINATA_GATEWAY = process.env.REACT_APP_PINATA_GATEWAY || "https://ivory-electronic-mollusk-196.mypinata.cloud";
const EXPECTED_NETWORK_ID = 1001; // Baobab testnet

function NFTMinter({ account }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [networkError, setNetworkError] = useState('');
  const [caver, setCaver] = useState(null);

  useEffect(() => {
    if (typeof window.klaytn !== 'undefined') {
      const caverInstance = new Caver(window.klaytn);
      console.log('Caver Instance:', caverInstance);
      setCaver(caverInstance);
      checkNetwork(caverInstance);
    } else {
      setNetworkError('Kaikas wallet not detected. Please install Kaikas.');
    }
  }, []);

  const checkNetwork = async (caverInstance) => {
    try {
      const networkId = await caverInstance.klay.net.getId();
      console.log('Connected to network ID:', networkId);
      if (networkId !== EXPECTED_NETWORK_ID) {
        setNetworkError(`Please switch to the Baobab testnet (Network ID: ${EXPECTED_NETWORK_ID})`);
      } else {
        setNetworkError('');
      }
    } catch (error) {
      console.error('Error checking network:', error);
      setNetworkError('Failed to check network. Please ensure Kaikas is connected.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      console.log('File uploaded to Pinata:', res.data);
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
      console.log('Metadata uploaded to Pinata:', res.data);
      return `${PINATA_GATEWAY}/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading metadata to Pinata:', error);
      throw error;
    }
  };

  const checkBalance = async () => {
    if (!account || !caver) {
      setError('Wallet not connected or Caver not initialized');
      return;
    }
  
    try {
      // Method 1: Using getBalance
      const balance1 = await caver.klay.getBalance(account);
      console.log('Balance (Method 1):', balance1);
  
      // Method 2: Using getAccount
      const accountInfo = await caver.klay.getAccount(account);
      const balance2 = accountInfo.account.balance;
      console.log('Balance (Method 2):', balance2);
  
      // Use the positive balance (likely the correct one)
      const rawBalance = balance2 !== '0x0' ? balance2 : balance1;
      console.log('Selected Raw Balance:', rawBalance);
  
      // Convert hex to decimal if necessary
      const decimalBalance = rawBalance.startsWith('0x') ? parseInt(rawBalance, 16).toString() : rawBalance;
      console.log('Decimal Balance:', decimalBalance);
  
      const balanceInKlay = caver.utils.fromPeb(decimalBalance, 'KLAY');
      console.log('Balance in KLAY:', balanceInKlay);
  
      const formattedBalance = parseFloat(balanceInKlay);
      console.log('Formatted Balance:', formattedBalance);
  
      const balanceBN = caver.utils.toBN(decimalBalance);
      console.log('Balance as BN:', balanceBN.toString());
      console.log('Is Balance Negative:', balanceBN.isNeg());
  
      setSuccess(`Your balance: ${formattedBalance} KLAY`);
      return { rawBalance: decimalBalance, balanceInKlay, formattedBalance };
    } catch (error) {
      console.error('Error checking balance:', error);
      setError('Failed to check balance: ' + error.message);
      throw error;
    }
  };

  const mintNFT = async () => {
    if (!account) {
      setError('Please connect your wallet first.');
      return;
    }
  
    if (networkError) {
      setError(networkError);
      return;
    }
  
    if (!file || !name || !description) {
      setError('Please fill in all fields and upload an image.');
      return;
    }
  
    if (!caver) {
      setError('Caver is not initialized. Please ensure Kaikas is connected.');
      return;
    }
  
    setMinting(true);
    setError('');
    setSuccess('');
  
    try {
      const imageUrl = await uploadToPinata(file);
      const metadataUrl = await createMetadata(imageUrl);
  
      console.log('Attempting to mint NFT with account:', account);
  
      const balanceInfo = await checkBalance();
  
      if (balanceInfo.formattedBalance < 0.1) {
        throw new Error(`Insufficient KLAY balance. Current balance: ${balanceInfo.balanceInKlay} KLAY. Please add more KLAY to your wallet.`);
      }
  
      const gasPrice = await caver.klay.getGasPrice();
      const gas = await contract.methods.mintNFT(account, metadataUrl).estimateGas({ from: account });
  
      const result = await contract.methods.mintNFT(account, metadataUrl).send({
        from: account,
        gas: gas,
        gasPrice: gasPrice
      });
  
      console.log('Minting result:', result);
      setSuccess('NFT minted successfully!');
      setFile(null);
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Error minting NFT:', err);
      setError('Error minting NFT: ' + err.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div>
      <h2>Mint Your NFT</h2>
      {networkError && <Alert variant="warning">{networkError}</Alert>}
      <Form>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter NFT name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter NFT description"
          />
        </Form.Group>
        <Button onClick={mintNFT} disabled={minting || !account || !file || !name || !description}>
          {minting ? <Spinner animation="border" size="sm" /> : 'Mint NFT'}
        </Button>
        <Button onClick={checkBalance} disabled={!account || !caver} className="ml-2">
          Check Balance
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
    </div>
  );
}

export default NFTMinter;