import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatUnits } from 'ethers';
import Caver from 'caver-js';
import contract from '../contractConfig';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

const PINATA_GATEWAY = process.env.REACT_APP_PINATA_GATEWAY || "https://ivory-electronic-mollusk-196.mypinata.cloud";
const EXPECTED_NETWORK_ID = 1001; // Baobab testnet

function NFTMinter({ account }) {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State for image preview
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
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile)); // Set image preview
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

    setMinting(true);
    setError('');
    setSuccess('');

    try {
      const imageUrl = await uploadToPinata(file);
      const metadataUrl = await createMetadata(imageUrl);

      console.log('Attempting to mint NFT with account:', account);

      const balance = await caver.klay.getBalance(account);
      const formattedBalance = parseFloat(formatUnits(balance, 18));

      console.log('Raw Balance:', balance);
      console.log('Formatted Balance:', formattedBalance);

      if (formattedBalance < 0.1) {
        throw new Error('Insufficient KLAY balance. Please add more KLAY to your wallet.');
      }

      const gasEstimate = await contract.methods.mintNFT(account, metadataUrl).estimateGas({ from: account });
      const gasPrice = await caver.klay.getGasPrice();
      console.log('Estimated Gas:', gasEstimate);
      console.log('Current Gas Price:', gasPrice);

      const result = await contract.methods.mintNFT(account, metadataUrl).send({
        from: account,
        gas: gasEstimate, // Use the estimated gas
        gasPrice: gasPrice // Use the current gas price
      });

      console.log('Minting result:', result);
      setSuccess('NFT minted successfully!');
      setFile(null);
      setFilePreview(null); // Clear image preview
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
          {filePreview && <img src={filePreview} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />}
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
            className="form-textarea"
          />
        </Form.Group>
        <Button onClick={mintNFT} disabled={minting || !account || !file || !name || !description}>
          {minting ? <Spinner animation="border" size="sm" /> : 'Mint NFT'}
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
    </div>
  );
}

export default NFTMinter;
