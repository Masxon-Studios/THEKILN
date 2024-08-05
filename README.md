The Kiln
The Kiln is a decentralized NFT minting tool designed for the Klaytn blockchain. It allows users to connect their wallets, upload media files, and mint NFTs directly on the Klaytn network using a user-friendly interface. The project is built with React, Web3Modal, and the Klaytn caver-js library, making it compatible with wallets like Kaikas and MetaMask.

Table of Contents
Features
Getting Started
Prerequisites
Installation
Configuration
Usage
Smart Contract Details
Project Structure
Contributing
License
Acknowledgments
Features
Wallet Integration: Seamlessly connect with Kaikas or MetaMask wallets.
NFT Minting: Upload images and metadata to Pinata, and mint NFTs on the Klaytn blockchain.
Gas Fee Estimation: Real-time gas fee estimation before minting NFTs.
Role-Based Access Control: Only authorized users can mint NFTs, ensuring security and control.
Customizable Supply Limit: Set a maximum supply limit for your NFT collection.
Getting Started
Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (v14 or higher)
npm (v6 or higher)
Git
MetaMask or Kaikas wallet installed in your browser
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/the-kiln.git
cd the-kiln
Install Dependencies:

bash
Copy code
npm install
Configuration
Environment Variables:
Create a .env file in the root directory and add the following:

makefile
Copy code
REACT_APP_PINATA_API_KEY=your-pinata-api-key
REACT_APP_PINATA_SECRET_API_KEY=your-pinata-secret-api-key
REACT_APP_PINATA_GATEWAY=https://your-custom-gateway.pinata.cloud
REACT_APP_KLAYTN_NODE_URL=https://api.baobab.klaytn.net:8651
Contract Address:
Update the contractConfig.js file with the deployed contract address:

javascript
Copy code
const contractAddress = '0xYourContractAddress';
Usage
Start the Development Server:

bash
Copy code
npm start
Access the Application:
Open your browser and navigate to http://localhost:8551 to use The Kiln.

Minting NFTs:

Connect your wallet (Kaikas or MetaMask).
Upload an image file and enter the required metadata.
Click "Mint NFT" to mint your unique token on the Klaytn blockchain.
Smart Contract Details
The smart contract used in The Kiln is written in Solidity and deployed on the Klaytn Baobab testnet. It includes the following features:

Minting Functionality: Allows users with the MINTER_ROLE to mint new NFTs.
URI Storage: Stores metadata on-chain, making it retrievable for each token.
Access Control: The owner can assign and revoke minting roles.
Deployment Script
To deploy the contract, run the following command:

bash
Copy code
npx hardhat run scripts/deploy.js --network baobab
Project Structure
bash
Copy code
The-Kiln/
│
├── public/
│   └── index.html           # Main HTML file
│
├── src/
│   ├── components/          # React components
│   │   ├── NFTMinter.js     # Main NFT minting component
│   │   └── WalletConnection.js # Wallet connection component
│   ├── contractConfig.js    # Contract configuration
│   ├── caver.js             # Caver instance for Klaytn interaction
│   └── App.js               # Main application component
│
├── contracts/               # Solidity contracts
│   └── NFTMinter.sol        # NFT Minter contract
│
├── scripts/
│   └── deploy.js            # Deployment script
│
├── test/
│   └── NFTMinter.test.js    # Test script for the smart contract
│
├── .env                     # Environment variables
├── .gitignore               # Files and directories to be ignored by Git
├── package.json             # Node.js dependencies and scripts
└── README.md                # Project documentation
Contributing
We welcome contributions to The Kiln! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Klaytn: For providing the blockchain platform and tools.
Pinata: For IPFS file storage.
Hardhat: For development environment support.
React: For the front-end framework.
