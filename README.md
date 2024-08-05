# The Kiln: Decentralized NFT Minting on Klaytn

![The Kiln Logo](path/to/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Klaytn](https://img.shields.io/badge/Klaytn-Compatible-blue)](https://www.klaytn.com/)
[![React](https://img.shields.io/badge/React-17.0.2-blue)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-363636)](https://soliditylang.org/)

The Kiln is a cutting-edge, decentralized NFT minting platform built specifically for the Klaytn blockchain. It empowers creators and collectors to mint, manage, and trade unique digital assets with ease and security.

## 🚀 Features

- **🔗 Multi-Wallet Integration**: Seamless connection with Kaikas and MetaMask wallets.
- **🖼️ User-Friendly Minting**: Intuitive interface for uploading media and minting NFTs.
- **⛽ Real-Time Gas Estimation**: Accurate gas fee predictions before minting.
- **🔒 Role-Based Access Control**: Enhanced security with customizable minting permissions.
- **📊 Supply Management**: Set and manage the maximum supply for your NFT collections.
- **🌐 IPFS Integration**: Reliable, decentralized storage for NFT metadata and assets via Pinata.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- MetaMask or Kaikas wallet browser extension

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Masxon-Studios/THEKILN.git
   cd THEKILN

Install dependencies:
bash
npm install

Set up environment variables:
Create a .env file in the root directory with the following:
text
REACT_APP_PINATA_API_KEY=your_pinata_api_key
REACT_APP_PINATA_SECRET_API_KEY=your_pinata_secret_key
REACT_APP_PINATA_GATEWAY=https://your_custom_gateway.pinata.cloud
REACT_APP_KLAYTN_NODE_URL=https://api.baobab.klaytn.net:8651

Update contract address:
In src/contractConfig.js, set your deployed contract address:
javascript
const contractAddress = '0xYourContractAddress';

🖥️ Usage
Start the development server:
bash
npm start

Open your browser and navigate to http://localhost:3000.
Connect your wallet (Kaikas or MetaMask).
Upload your NFT image and enter metadata.
Click "Mint NFT" to create your unique token on Klaytn.
🧠 Smart Contract
Our smart contract, written in Solidity, includes:
Minting functionality with role-based access
On-chain metadata storage
Customizable supply limits
Owner-controlled minting permissions
Deployment
Deploy the contract to Klaytn Baobab testnet:
bash
npx hardhat run scripts/deploy.js --network baobab

🏗️ Project Structure
text
The-Kiln/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── NFTMinter.js
│   │   └── WalletConnection.js
│   ├── contractConfig.js
│   ├── caver.js
│   └── App.js
│
├── contracts/
│   └── NFTMinter.sol
│
├── scripts/
│   └── deploy.js
│
├── test/
│   └── NFTMinter.test.js
│
├── .env
├── .gitignore
├── package.json
└── README.md

🤝 Contributing
We welcome contributions! Here's how you can help:
Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments
Klaytn - For providing the blockchain platform and tools
Pinata - For IPFS file storage solutions
Hardhat - For the robust development environment
React - For powering our front-end
📞 Contact
Masxon Studios - @MasxonStudios - info@masxonstudios.com
Project Link: https://github.com/Masxon-Studios/THEKILN
🚀 Roadmap
 Initial release with basic minting functionality
 Integration with popular NFT marketplaces
 Advanced royalty management system
 Multi-chain support
 Mobile app development
Stay tuned for more exciting features!
